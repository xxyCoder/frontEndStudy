# vuex  
                dispatch             commit                  mutate             render
Vue component -----------> Actions ------------> Mutations -----------> State -----------> Vue component
- 可以跳过dispatch直接通过commit和mutations通信 
- getters相当于computed

# map
1. mapState帮助我们生成state中的数据属性为计算属性
2. mapGetters帮助我们生成getters中的数据属性为计算属性