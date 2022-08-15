<template>
	<Icon :icon="name"></Icon>
</template>

<script setup>
	defineProps({
		name: {
		    type: String,
		    required: true
		}, 
	})
	import { Icon } from '@iconify/vue'
</script>

<style>
</style>
