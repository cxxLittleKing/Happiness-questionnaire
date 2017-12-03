import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
	state:{
	  user_name:'',
        password: '',
        user_id:'',
        questions:null,
        time: '',//提问时间,
        duration:'',//购买月份的个数
        package_id:'',
        end_time:''
	},
	mutations:{
		setUserId(state,data){
            let length=data.data.data.length
            state.user_id =data.data.data[length-1].user_id;
            state.user_name=data.data.data[length-1].uname;
            state.package_id=data.data.data[length-1].package_id;
            state.end_time=data.data.data[length-1].end_time;
            
            if( state.package_id==2){state.duration='一'}
            else if( state.package_id==3){state.duration='三'}
            else if( state.package_id==4){state.duration='十二'}   
      

            console.log(state.user_id )            
            },
            doMonth(state,data){
                  state.duration=data
                  console.log(data)      
            }
	},
})