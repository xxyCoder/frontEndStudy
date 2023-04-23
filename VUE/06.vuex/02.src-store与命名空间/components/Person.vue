<template>
    <div>
        <h2>人员列表</h2>
        <input type="text" placeholder="请输入名字" v-model="name"/>
        <button @click="add">添加</button>
        <ul>
            <li v-for="p in personList" :key="p.id">{{p.name}}</li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import {nanoid} from 'nanoid';
    export default {
        name:'PersonVue',
        data() {
            return {
                name: ''
            };
        },
        computed: {
            ...mapState('personOptions',['personList'])
        },
        methods: {
            add() {
                const person = {id:nanoid(),name:this.name};
                this.$store.commit('personOptions/ADD_PERSON',person);
            }
        }
    }
</script>