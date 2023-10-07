function showreturndata(b_name,b_fine)
{
    
        
        
        
        const returnDataContainer = document.createElement('div');
        returnDataContainer.className = 'book-details';
        const bookNameElement = document.createElement('p');
        bookNameElement.textContent = `Book Name: ${b_name}`;
        const fineElement = document.createElement('p');
        fineElement.textContent = `Fine: ${b_fine} INR`; // Display the fine with currency (e.g., INR)
        returnDataContainer.appendChild(bookNameElement);
        returnDataContainer.appendChild(fineElement);
        const returnContainer = document.getElementById('returnContainer');
        returnContainer.appendChild(returnDataContainer);
}

function setreturnIssue() {
    const ISTCurrentTime = new Date(); 
    
    
    ISTCurrentTime.setMinutes(ISTCurrentTime.getMinutes() + 330);
    
    const issueDateFormatted = ISTCurrentTime.toISOString().replace('T', ' ').replace(/\.\d{3}Z/, '');
    document.getElementById("issuedate").value = issueDateFormatted;
    
    ISTCurrentTime.setHours(ISTCurrentTime.getHours() + 1); 
    const returnDateFormatted = ISTCurrentTime.toISOString().replace('T', ' ').replace(/\.\d{3}Z/, '');
    document.getElementById("returndate").value = returnDateFormatted;
}
//------------------------------------------------------------------------------------------------------------------


function calculatefine(returndate) {
    const Rdate = new Date(returndate);
    const currentDate = new Date();
    if((currentDate.getTime)>(Rdate.getTime))
    {currentDate.setMinutes(currentDate.getMinutes() + 330); // Add 330 minutes for IST

    const hoursLate = currentDate.getHours() - Rdate.getHours();
    const minutesLate = currentDate.getMinutes() - Rdate.getMinutes();

    // Calculate the total late time in hours and minutes
    const totalLateHours = hoursLate + minutesLate / 60;

    return Math.max(0, totalLateHours) * 10;
} 
    else return 0;
    // Ensure the minimum fine is 0
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
            //  payButton.addEventListener('click', (event) => {
            //     const bname = event.target.getAttribute('data-bookname');
            //     const returndate = event.target.getAttribute('data-returndate');
            //     const ID=event.target.getAttribute('data-ID')
            //     const fine = calculatefine(returndate);
            //     const returnDataContainer = document.createElement('div');
            //     returnDataContainer.className = 'book-details';
            //     const bookNameElement = document.createElement('p');
            //     bookNameElement.textContent = `Book Name: ${bname}`;
            //     const fineElement = document.createElement('p');
            //     fineElement.textContent = `Fine: ${fine} INR`; // Display the fine with currency (e.g., INR)
            //     returnDataContainer.appendChild(bookNameElement);
            //     returnDataContainer.appendChild(fineElement);
            //     const returnContainer = document.getElementById('returnContainer');
            //     returnContainer.appendChild(returnDataContainer);

            



            // });
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
