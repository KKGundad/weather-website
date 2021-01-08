



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');
const message3 = document.querySelector('#message-3');
const message4 = document.querySelector('#message-4');

//message1.textContent='From JS'

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value;
    message1.textContent = 'Loading...';
    message2.textContent = '';
    message3.textContent = '';
    message4.textContent = '';
    
    const url = `/weather?address=${location}`;
    fetch(url).then((response)=>{
    response.json().then((data) => {
        if (data.error){
            console.log(data.error);
            message1.textContent = data.error;
        } 
        
        else 
        {
            console.log(data);
            message1.textContent = data.address ;
            message2.textContent = data.temperature;
            message3.textContent = data.humidity;
            message4.textContent = data.pressure;
        }
        
    })
})
})