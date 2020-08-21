<template>
    <div class="max-w-full text-center text-3xl py-10 bg-blue-300 font-extrabold" id="money">
        Rp. {{this.$store.state.money.toLocaleString()}}
    </div>
</template>

<script>
export default {
};
</script>

<style>
#money {
    color: whitesmoke;
    margin-top: 1%;
    font-weight: bold;
}
</style>
