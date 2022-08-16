<template>
<div class="admin">
    <h1>UNDER CONSTRUCTION</h1>
    <CollectionComponent />
</div>
</template>

<script>
import CollectionComponent from '../components/admin/CollectionComponent.vue';

export default {
    components: {
    CollectionComponent,
}
}
</script>

<style scoped>
.admin {
    display: flex;
    flex-direction: column;
    align-content: center;
}
h1 {
    font-size: 10rem;
    text-align: center;
    text-shadow: 3px 3px 3px gray;
}
</style>
