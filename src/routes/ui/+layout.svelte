<script lang="ts">
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';

    let loaded = false;

    onMount(() => {
        loaded = true;
    });
</script>

{#if loaded}
    <div class="flex w-full h-full" transition:fade={{ delay: 250, duration: 300 }}>
        <slot></slot>
    </div>
{/if}