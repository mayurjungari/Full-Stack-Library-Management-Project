function showreturndata(b_name,b_fine)
{
    
        const returnDataContainer = document.createElement('div');
        returnDataContainer.className = 'book-details';
        const bookNameElement = document.createElement('p');
        bookNameElement.textContent = `Book Name: ${b_name}`;
        const fineElement = document.createElement('p');
        fineElement.textContent = `Fine: ${b_fine} INR`; 
        returnDataContainer.appendChild(bookNameElement);
        returnDataContainer.appendChild(fineElement);
        const returnContainer = document.getElementById('returnContainer');
        returnContainer.appendChild(returnDataContainer);
}

function setreturnIssue() {
    // Get the current time
    const currentTime = new Date();
    currentTime.setMinutes(currentTime.getMinutes() + 330);
    const issueDate = currentTime.toISOString().replace('T', ' ');
    document.getElementById("issuedate").value = issueDate;
    currentTime.setHours(currentTime.getHours() + 1);
    const returnDate = currentTime.toISOString().replace('T', ' ');

    // Set the formatted return date in the "returndate" input field
    document.getElementById("returndate").value = returnDate;
}

//------------------------------------------------------------------------------------------------------------------


function calculatefine(returndate) {
    const Rdate = new Date(returndate);
    console.log(Rdate);
   
    const currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes()+330);
    console.log(currentDate)
    const hourlate=(currentDate.getHours()+(currentDate.getMinutes())/60)-(Rdate.getHours()+(Rdate.getMinutes())/60)
    console.log(hourlate)
   return Math.round(Math.max(0,hourlate*10));
   
}

  
//------------------------- Fetchdata and append the data to the flex box
document.addEventListener('DOMContentLoaded', async function () {
    try {
        const alldata = await fetch('/library/getdata');
        const data = await alldata.json();

        const dataContainer = document.getElementById('dataContainer');
        dataContainer.innerHTML = '';

        data.forEach(item => { //
            const dataBox = document.createElement('div');
            dataBox.className = 'data-box';
    ///////creating return button 
    const ret=document.createElement('button')
    ret.className='return'
    ret.type='button'
    ret.textContent='Return'
    
    //----------------------------------


   

    const fine =calculatefine(item.RETURNDATE)
     ///creating  fine input
     const payfine=document.createElement('input')
     payfine.className='fineinput'
     payfine.value=fine;
 
     //-----pay button
     const payButton = document.createElement('button');
             payButton.className = 'pay-button';
             payButton.type = 'button';
             payButton.textContent = 'Pay';
             payButton.setAttribute('data-bookname', item.BOOKNAME);
             payButton.setAttribute('data-returndate', item.RETURNDATE);
             payButton.setAttribute('data-ID',item.ID)
             //-----retuurn event listener
 
             ret.addEventListener('click',()=>{
                 dataBox.appendChild(payfine);
                 dataBox.appendChild(payButton);
             })
           

            



           
            payButton.addEventListener('click', async () => {
                try {
                    const id = item.ID;
                    const bookname = item.BOOKNAME;
                    const retdate=item.RETURNDATE;
            
                    const fine = calculatefine(item.RETURNDATE);
            
                    // Store book details in localStorage
                    const bookdetail = { bookname, fine ,retdate};
                    localStorage.setItem( id, JSON.stringify(bookdetail));
            
                    const response = await fetch(`/library/delete/${id}`, {
                        method: 'DELETE',
                    });
            
                    if (response.ok) {
                        alert('succesfully deleted')
                        window.location.reload();
                    }
            
                    console.log("Getting difficulty in searching");
                } catch (error) {
                    console.log(error);
                }
            });
            //---------------------------------
           
            
            


            dataBox.innerHTML = `
                <b>Book Name:</b> ${item.BOOKNAME}<br>
                <b>Issue Date:</b> ${item.ISSUEDATE}<br>
                <b>Return Date:</b> ${item.RETURNDATE}<br>
                <b>Fine:<b>${fine}
                
            `;

            dataBox.appendChild(ret)
            dataContainer.appendChild(dataBox);
        });

        //---------------retrive return book from local storage and showing on scereen
        for (let i = 0; i < localStorage.length; i++)
         {
            const key = localStorage.key(i);
            const value = JSON.parse(localStorage.getItem(key));
            showreturndata(value.bookname,value.fine)
        }

    } catch (error) {
        console.log(error);
    }
});
