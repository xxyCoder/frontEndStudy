<template>
    <div>
        <h2>当前值为{{ sum}}</h2>
        <h2>当前值的10倍为{{ bigSum }}</h2>
        <h2>我在{{school}} 学习 {{subject}}</h2>
        <h2>下方组件总人数{{personList.length}}</h2>
        <select v-model.number="n">
            <option :value="1">1</option>
            <option :value="2">2</option>
            <option :value="3">3</option>
        </select>&nbsp;
        <button @click="inc(n)">+</button>&nbsp;
        <button @click="dec(n)">-</button>&nbsp;
        <button @click="incWhenIsOdd">和为奇数+1</button>
    </div>
</template>

<script>
    import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
    export default {
        name:'CountVue',
        data() {
            return {
                n: 1
            };
        },
        methods: {
            ...mapActions('countOptions',{'inc':'add'}),
            ...mapMutations('countOptions',{'dec':'SUB'}),
            incWhenIsOdd() {
                if(this.$store.state.countOptions.sum % 2 != 0) {
                    this.$store.dispatch('countOptions/add',this.n);
                }
            }
        },
        computed: {
            // ...mapState(['countOptions','personOptions'])
            ...mapState('countOptions',['sum','school','subject']),
            ...mapState('personOptions',['personList']),
            ...mapGetters('countOptions',['bigSum'])
        }
    }
</script>