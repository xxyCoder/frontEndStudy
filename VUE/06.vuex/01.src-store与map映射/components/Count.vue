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
    import { mapState,mapGetters, mapMutations, mapActions } from 'vuex';
    export default {
        name:'CountVue',
        data() {
            return {
                n: 1
            };
        },
        methods: {
            // inc() {
            //     this.$store.dispatch('add',this.n);
            // },
            // 对象写法,哪个地方调用的时候有参数必须传入参数,否则默认传入event事件
            ...mapActions({'inc':'add'}),
            // ...mapActions({}),
            // dec() {
            //     this.$store.commit('SUB',this.n);
            // },
            // 对象写法,哪个地方调用的时候有参数必须传入参数,否则默认传入event事件
            ...mapMutations({'dec':'SUB'}),
            // 数组写法要求key value值一致


            incWhenIsOdd() {
                if(this.$store.state.sum % 2 != 0) {
                    this.$store.dispatch('add',this.n);
                }
            }
        },
        computed: {
            // sum() {
            //     return this.$store.state.sum;
            // },
            // school() {
            //     return this.$store.state.school;
            // },
            // subject() {
            //     return this.$store.state.subject;
            // },
            // 借助mapState中生成计算属性，从state中读取  对象写法
            // ...mapState({
            //     'sum': 'sum',
            //     'school':'school',
            //     'subject': 'subject'
            // }),
            // 数组写法，要求从state中读取的变量和计算属性名字一致
            ...mapState(['sum','school','subject','personList']),

            // 通过mapGetters生成计算属性
            // bigSum() {
            //     return this.$store.getters.bigSum;
            // }
            // 对象写法
            // ...mapGetters({'bigSum':'bigSum'})
            // 数组写法
            ...mapGetters(['bigSum'])
        },
        mounted() {
            const x = mapState({
                'sum': 'sum',
                'school':'school',
                'subject': 'subject'
            });
            console.log(x);
        }
    }
</script>