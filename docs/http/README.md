# HTTP Requests

## Architecture

In a _Single Page Application (SPA)_, communication with the server is done via asynchronous HTTP requests (_AJAX_) or more specialized protocols such as WebSocket. We will see how to make these network requests from a Vue application.

Vue.js is a framework that focuses on the user interface and offers nothing special to exchanges with a server. This choice of implementation is left to the developer. The easiest way to make an asynchronous HTTP request in JavaScript is to use [the `fetch` method](https://developer.mozilla.org/en/docs/Web/API/Fetch_API/Using_Fetch). It is not supported on Internet Explorer but there are polyfills to complete the support. As an alternative, you can use other more complete third-party libraries such as [Axios](https://github.com/axios/axios), which is recommended by the Vue team.

::: tip
Network calls should not be done directly from the code of a component. This prevents reuse of the code easily if another component has to make the same call. Instead, opt to systematically separate the application logic from the logic of your views.

By convention, we code the application logic in JS files called _services_, distributed according to the large functional parts of your application and placed in a folder `src/services`.
:::

## Practical Work: Communicate with a back-end

We will use a server-provided API (the _back-end_) to authenticate users and search for films. This back-end has already been developed, you can clone [this repo](https://github.com/worldline/vuejs-training-backend) and run the API locally with:

```bash
git clone https://github.com/worldline/vuejs-training-backend 
cd ./vuejs-training-backend/
npm install
npm run start
```

::: tip
Once the server has started, The back-end interface contract is available here: [api-docs](http://localhost:3030/api-docs/)
:::

1. Create a generic service (`services/api.js`) to call the backend, with this content:

```js
import { useSession } from '../stores/session.js'

export const BASE_URL = 'http://localhost:3030'

export async function api (url, params = {}) {
    const session = useSession()

    params = Object.assign({
        mode: 'cors',
        cache: 'no-cache',
    }, params)

    params.headers = Object.assign({
        Authorization: `Bearer ${session.token}`,
        'Content-Type': 'application/json'
    }, params.headers)

    let response = await fetch(BASE_URL + url, params)
    let json = await response.json() || {}
    if (!response.ok){
        let errorMessage = json.error || response.status
        throw new Error(errorMessage)
    }
    return json
}
```

There is no code specific to Vue here, it is a utility function around the `fetch` method to communicate with our backend. The `Authorization` header is used to send the authentication token to the backend. Other options are used to configure HTTP caching and the cross-origin permissions to apply.

2. Create a `services/UserService.js` service that will use API endpoints for user registration and login:

```js
import { api } from "@/services/api.js";

export default {
  register(credentials) {
    return api("/user/register", {
      method: "POST",
      body: JSON.stringify(credentials)
    });
  },
  login(credentials) {
    return api("/user/login", {
      method: "POST",
      body: JSON.stringify(credentials)
    });
  },
  user() {
    return api("/user");
  }
};
```

3. In `LoginForm` component, add a second button to register next to the login button, then modify the `LoginForm` methods to call the functions located in `UserService`:

```js
import UserService from '@/services/UserService.js'

export default {
  methods: {
    async register () {
      this.error = null;
      try {
        const response = await UserService.register({
          email: this.email,
          password: this.password,
          firstname: 'John',
          lastname: 'Smith'
        })
        const session = useSession();
        session.login({ user: response.user, token: response.token });
        this.$router.push('/search')
      } catch (error) {
        this.error = error.toString()
      }
    },

    async login () {
      this.error = null;
      try {
        const response = await UserService.login({ email: this.email, password: this.password })
        const session = useSession();
        session.login({ user: response.user, token: response.token });
        this.$router.push('/search')
      } catch (error) {
        this.error = error.toString()
      }
    }
  }
}
```

4. Note that in the event of an error, the error message is stored in an `error` variable. If not already done, declare this variable in the component's `data` and use it in the template to display the error message in case of authentication failure.

5. Note also that the response of the back-end after login contains a token to authenticate the user, which is passed to the store in the parameters of the `login` action. Modify `stores/session.js` to also store this `token`.

6. The `api` service is already configured to add this token to the request authorization header. Check that the token is sent as a HTTP header via the developer tools of your browser.

7. **Bonus**: Modify the store's logout action to remove the token and user info from the store upon logout, and make sure the user is redirected to the login form.

8. Create a `FilmService` service with a method to search for films, following the API documentation (`GET /movies/search`).

9. Complete the `SearchFilm` component with a `query` data bound to the search input, then call the `FilmService` so that the user can search for a film by name.

::: tip

If you discovered that there was a film called _Undefined_, then you made a mistake somewhere :)

![Undefined, the movie](../assets/undefined.jpg)
:::
