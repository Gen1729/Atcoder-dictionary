<script setup lang="ts">
import { ref } from 'vue'

type Ind = {
  name: string
  url: string
  difficulty: number
}

const problems = ref<Ind[]>()

const checkedWords = ref<string[]>([])

const checkedContests = ref<number[]>([])

const lowerDiff = ref<number>(0)
const higherDiff = ref<number>(3200)

async function searchWords() {
  let s: string = ''
  let s2: string = ''

  for (let i: number = 0; i < checkedWords.value?.length; i++) {
    s += checkedWords.value[i]
    if (i == checkedWords.value?.length - 1) break
    s += ','
  }

  for (let i: number = 0; i < checkedContests.value?.length; i++) {
    s2 += checkedContests.value[i]
    if (i == checkedContests.value?.length - 1) break
    s2 += ','
  }

  const res = await fetch(
    `/api/dict?words=${s}&contest=${s2}&difficulty=${lowerDiff.value},${higherDiff.value}`,
  )
  if (res.ok) {
    problems.value = await res.json()
  }
}
</script>

<template>
  <div class="container">
    <div class="left">
      <button @click="searchWords">検索</button>
      <div>
        <input type="number" v-model="lowerDiff" style="width: 50px" /> 〜
        <input type="number" v-model="higherDiff" style="width: 50px" />
      </div>

      <div>
        <input type="checkbox" id="abc" value="ABC" v-model="checkedWords" />
        <label for="abc">ABC</label>
        <input type="checkbox" id="arc" value="ARC" v-model="checkedWords" />
        <label for="arc">ARC</label>
      </div>
      <div>
        <input type="checkbox" id="a" value="A" v-model="checkedWords" />
        <label for="a">A</label>
        <input type="checkbox" id="b" value="B" v-model="checkedWords" />
        <label for="b">B</label>
        <input type="checkbox" id="c" value="C" v-model="checkedWords" />
        <label for="c">C</label>
        <input type="checkbox" id="d" value="D" v-model="checkedWords" />
        <label for="d">D</label>
        <input type="checkbox" id="e" value="E" v-model="checkedWords" />
        <label for="e">E</label>
        <input type="checkbox" id="f" value="F" v-model="checkedWords" />
        <label for="f">F</label>
        <input type="checkbox" id="g" value="G" v-model="checkedWords" />
        <label for="g">G</label>
      </div>
      <div>
        <input type="checkbox" id="356" value="356" v-model="checkedContests" />
        <label for="356">356</label>
        <input type="checkbox" id="357" value="357" v-model="checkedContests" />
        <label for="357">357</label>
      </div>
    </div>
    <div class="right">
      <div v-for="(item, index) in problems" :key="index">
        <a :href="item.url" target="_blank"
          >{{ item.name }} |== Difficluty:{{ item.difficulty }} ==|</a
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  height: 100%;
}

.left {
  width: 400px;
}

.right {
  flex: 1;
  box-sizing: border-box;
}

.left {
  background: #f8f8f8;
}

.right {
  background: #e0e7ff;
}
</style>
