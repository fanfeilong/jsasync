
const fs = require('fs');
const async_hooks = require('async_hooks');

let logs = {

};

let getOwnLog = ()=>{
	const eid = async_hooks.executionAsyncId();
	const tid = async_hooks.triggerAsyncId();

	let ownLogs = null;
	let parentId = tid;
	let parentIdOwnId = null;
	for(let ownId in logs){
		const curLogs = logs[ownId];
		for(let j=0;j<curLogs.length;j++){
			const curLog = curLogs[j];
			if(curLog.eid===parentId){
				parentIdOwnId = ownId;
				parentId = curLog.tid;
			}
		}
	}

	if(parentIdOwnId==null){
		logs[eid] = [];
		ownLogs = logs[eid];
	}else{
		ownLogs = logs[parentIdOwnId];
	}

	return {
		push:(info)=>{
			ownLogs.push({eid, tid, info});
		}
	}
};

function other(i){
	const curLogs = getOwnLog();
	curLogs.push(`${i} [3] before other`);

	setTimeout(()=>{
		const curLogs = getOwnLog();
		curLogs.push(`${i} [3] after other`);
	});
}


function test(i){
	

  	const curLogs = getOwnLog();
	curLogs.push(`${i} [1] before setTimeout`);

	setTimeout(()=>{

  		const curLogs = getOwnLog();
  		curLogs.push(`${i} [1] after setTimeout`);

  		curLogs.push(`${i} [2] before setTimeout`);

		setTimeout(()=>{

	  		const curLogs = getOwnLog();
			curLogs.push(`${i} [2] after setTimeout`);

			other(i);

		});
	});

	curLogs.push(`${i} next statement of setTimeout`);
}

function main(){

	// 两次操作的日志应该可以被严格区分出来

	setTimeout(()=>{
		test(1);
	});

	setTimeout(()=>{
		test(2);
	});
}

const asyncHook = async_hooks.createHook({
  init(asyncId, type, triggerAsyncId, resource) { 
  	// const eid = async_hooks.executionAsyncId();
  	// const tid = async_hooks.triggerAsyncId();
  	// fs.writeSync(1,`init: asyncId:${asyncId}, triggerAsyncId:${triggerAsyncId}, executionAsyncId:${eid}, triggerAsyncId:${tid}\n`);
  },
  before(asyncId) {
  	// const eid = async_hooks.executionAsyncId();
  	// const tid = async_hooks.triggerAsyncId();
  	// fs.writeSync(1,`before: asyncId:${asyncId}, executionAsyncId:${eid}, triggerAsyncId:${tid}\n`);
  },
  after(asyncId){
  	// const eid = async_hooks.executionAsyncId();
  	// const tid = async_hooks.triggerAsyncId();
  	// fs.writeSync(1,`after: asyncId:${asyncId}, executionAsyncId:${eid}, triggerAsyncId:${tid}\n`);
  },
  destroy(asyncId) { 
  	// const eid = async_hooks.executionAsyncId();
  	// fs.writeSync(1,`destroy: asyncId:${asyncId}, executionAsyncId:${eid}\n`);
  }
});

asyncHook.enable();

main();

process.on('exit',()=>{
	console.log(JSON.stringify(logs,null,2));
});

// call chian split for concurrent method calls:
// ================
// output:
// ================
// {
//   // -----------------------------------
//   // all logs of the first call to test
//   // -----------------------------------
//   "2": [
//     {
//       "eid": 2,
//       "tid": 1,
//       "info": "1 [1] before setTimeout"
//     },
//     {
//       "eid": 2,
//       "tid": 1,
//       "info": "1 next statement of setTimeout"
//     },
//     {
//       "eid": 4,
//       "tid": 2,
//       "info": "1 [1] after setTimeout"
//     },
//     {
//       "eid": 4,
//       "tid": 2,
//       "info": "1 [2] before setTimeout"
//     },
//     {
//       "eid": 6,
//       "tid": 4,
//       "info": "1 [2] after setTimeout"
//     },
//     {
//       "eid": 6,
//       "tid": 4,
//       "info": "1 [3] before other"
//     },
//     {
//       "eid": 8,
//       "tid": 6,
//       "info": "1 [3] after other"
//     }
//   ],
//
//   // -----------------------------------
//   // all logs of the second call to test
//   // -----------------------------------
//   "3": [
//     {
//       "eid": 3,
//       "tid": 1,
//       "info": "2 [1] before setTimeout"
//     },
//     {
//       "eid": 3,
//       "tid": 1,
//       "info": "2 next statement of setTimeout"
//     },
//     {
//       "eid": 5,
//       "tid": 3,
//       "info": "2 [1] after setTimeout"
//     },
//     {
//       "eid": 5,
//       "tid": 3,
//       "info": "2 [2] before setTimeout"
//     },
//     {
//       "eid": 7,
//       "tid": 5,
//       "info": "2 [2] after setTimeout"
//     },
//     {
//       "eid": 7,
//       "tid": 5,
//       "info": "2 [3] before other"
//     },
//     {
//       "eid": 9,
//       "tid": 7,
//       "info": "2 [3] after other"
//     }
//   ]
// }

