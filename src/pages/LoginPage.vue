<template>
    <div class="login">
        <form
            @submit.prevent="login"
            method="post"
            class="login__form"
        >
            <label for="username">Username</label>
            <input
                type="text"
                name="username"
                placeholder="Johny"
                v-model="username"
            >
            <label for="password">Password</label>
            <input
                id="password"
                type="password"
                name="password"
                placeholder="password"
                v-model="password">
            <button>Login</button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';
    import { BACKEND_URL_API } from '../constants';
    import { useAuthStore } from '../stores/auth';
    import { parseJwt } from '../helpers/jwt'

    export default {
        setup() {
            const authStore = useAuthStore();

            return {
                authStore,
            };
        },
        data() {
            return {
                username: '',
                password: '',
            }
        },
        methods: {
            async login() {  
                try {
                    const response = await axios.post(
                        `${BACKEND_URL_API}/auth/login`,
                        {
                            username: this.username,
                            password: this.password,
                        }
                    );
                    const at = response.data?.access.token;
                    const rt = response.data?.refresh.token;

                    this.authStore.accessToken = at;
                    this.authStore.refreshToken = rt;

                    const parsed = parseJwt(at);
                    console.debug({parsed})
                    if (parsed.is_admin) {
                        this.$router.push({
                            name: 'Admin',
                        });
                    } else {
                        this.$router.push({
                            name: 'home',
                        });
                    }
                    
                } catch (error) {
                    // TODO: show error
                    console.error(error, error.response?.data.detail);
                }
            }
        }
    }
</script>

<style scoped>
.login {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.login__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
}

.login__form input {
    line-height: 1.6rem;
    font-size: 1.5rem;
    border-radius: 6px;
    border: none;
}

.login__form input:focus {
    outline: 1px solid #0055FF;
    box-shadow: 3px 3px 3px #0055FF;
}

</style>
