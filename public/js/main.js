console.log('Client Site JS loaded!');



const weatherForm=document.querySelector('form');
const search=document.querySelector('input');
const messageOne=document.querySelector('#message-1');
const messageTwo=document.querySelector('#message-2');

messageOne.textContent='Type Your Location';
messageTwo.textContent='';

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location=search.value;
    fetch('http://localhost:3000/weather?address='+location+'').then((res)=>{
    res.json().then((data)=>{
        if(data.err){
            messageOne.textContent=data.err;
            messageTwo.textContent='';

        }else{
            messageOne.textContent=data.forcast.forcast;
            messageTwo.textContent=data.location;
        }
    })
});
})