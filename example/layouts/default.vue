<template>
    <div>
        <main style="padding-left:350px">
            <nuxt />
        </main>

        <no-ssr>
             <admin-panel />
        </no-ssr>
    </div>
</template>

<script>
    import AdminPanel from "../../lib/components/admin-panel";

    export default {
        name: "DefaultLayout",
        components: {
            AdminPanel,
        },
    };
</script>
