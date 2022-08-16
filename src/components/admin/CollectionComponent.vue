<template>
    <div class="collections">
        <div class="collections__create">
        </div>
        <div class="collections__list">
            <h3>Collections </h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Human name</th>
                        <th>Description</th>
                        <th>Issuer Address</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(collection, n) in collections"
                        :key="n"
                    >
                        <td>{{ collection.name }}</td>
                        <td>{{ collection.human_name }}</td>
                        <td>{{ collection.description }}</td>
                        <td>{{ collection.issuer_address }}</td>
                        <td><button>delete</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    import { BACKEND_URL_API } from '../../constants';

    export default {
        data() {
            return {
                offset: 0,
                collections: [],
            };
        },
        async mounted() {
            await this.fetchList();
            this.offset += 50;
        },
        methods: {
            create(){},
            async fetchList(){
                try {
                    const result = await axios.get(
                        `${BACKEND_URL_API}/collections/list`,
                        {
                            params: {
                                offset: this.offset,
                            },
                        }
                    );
                    this.collections = this.collections.concat(result.data);
                } catch (error) {
                    console.error(error);
                }
            }
        }
    }
</script>

<style scoped>
.collections {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.collections__list {
    width: 80%;
}

table {
    font-size: 18px;
    width: 100%;
}

table td {
    text-align: center;
}

</style>
