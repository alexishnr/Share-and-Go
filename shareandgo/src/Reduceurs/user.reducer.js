export default function(user = [], action) {
  if(action.type == 'user') {
    console.log(action.user,'useeer reducer');
    return action.user
  }else {
    return user
  }
}
