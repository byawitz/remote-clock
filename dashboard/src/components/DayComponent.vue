<template>
  <div class="form-block">
    <div class="day-check">
      <input :id="day" v-model="model!.isWorking" type="checkbox" :checked="model!.isWorking">
      <label :for="day">{{ day[0].toUpperCase() + day.slice(1) }}</label>
    </div>

    <div class="day-block" v-if="model!.isWorking">
      <select v-model="model!.from">
        <option v-for="time in times" :value="time" :key="`from-${time}`">{{ time }}</option>
      </select>

      <span>TO</span>
      <select v-model="model!.to">
        <option v-for="time in times" :value="time" :key="`to-${time}`">{{ time }}</option>
      </select>

    </div>
  </div>
</template>

<script lang="ts" setup>
import type Day from "@/lib/Day";
import type {PropType} from "vue";


const model = defineModel({type: Object as PropType<Day>});

defineProps({
  day: {type: String, default: '',}
})

const times: string[] = [];

for (let time = 0; time < 24; time++) {
  const hour = time.toString().padStart(2, '0');

  times.push(`${hour}:00`);
  times.push(`${hour}:30`);
}

</script>

<style>
input[type=checkbox] {
  width: unset;
  margin-top: unset;
}

.day-check {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>