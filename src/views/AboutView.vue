<script setup lang="ts">
import { onMounted, ref } from 'vue'

type Ind = {
  name: string
  url: string
}

const pong = ref<Ind[]>()

onMounted(async () => {
  const res = await fetch('/api/dict?words=A,B,for')
  if (res.ok) {
    pong.value = await res.json()
  }
})
</script>

<template>
  <div>
    <div v-for="(item, index) in pong" :key="index">
      <a :href="item.url" target="_blank">{{ item.name }}</a>
    </div>
  </div>
</template>

<style></style>
