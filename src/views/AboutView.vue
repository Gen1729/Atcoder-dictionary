<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

type Ind = {
  name: string
  url: string
}

const pong = ref<Ind[]>()

const checkedWords = ref<string[]>([])

async function searchWords() {
  let s: string = ''

  for (let i: number = 0; i < checkedWords.value?.length; i++) {
    s += checkedWords.value[i]
    if (i == checkedWords.value?.length - 1) break
    s += ','
  }
  const res = await fetch('/api/dict?words=' + s)
  if (res.ok) {
    pong.value = await res.json()
  }
}
</script>

<template>
  <div>
    <div v-for="(item, index) in pong" :key="index">
      <a :href="item.url" target="_blank">{{ item.name }}</a>
    </div>
  </div>
  <button @click="searchWords">検索</button>
  <h2>Multi Checkbox</h2>
  <input type="checkbox" id="abc" value="ABC" v-model="checkedWords" />
  <label for="abc">ABC</label>
  <input type="checkbox" id="a" value="A" v-model="checkedWords" />
  <label for="a">A</label>
  <input type="checkbox" id="b" value="B" v-model="checkedWords" />
  <label for="b">B</label>
  {{ checkedWords }}
</template>

<style></style>
