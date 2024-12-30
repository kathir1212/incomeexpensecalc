var userincomefilter = false;
let isEdit = false;
let expense = false;
var incomess = document.getElementById('totalincome');
incomess.innerHTML = "Rs 0";
var expenses = document.getElementById('totalexpenses');
expenses.innerHTML = "Rs 0";
var netbt = document.getElementById('netbalance');
netbt.innerHTML = "Rs 0";


async function postData() {
    if(isEdit === false){
        var description = document.getElementById("description").value;
        
        var amount = document.getElementById("amount").value;
        var type = document.getElementById("type").value;
    
      
        await fetch(
          "https://676e496ddf5d7dac1cca2c26.mockapi.io/users",
          {
            method: "POST",
            body: JSON.stringify({ description: description , amount: amount , type: type }),
            headers: {
              "Content-Type": "application/json",
            }
          }
        );
    
        var content = document.getElementById("content");
          content.innerHTML = "";
          gettotalincome();
          getData();
          
          document.getElementById("description").value = "";
          document.getElementById("amount").value = "";
          document.getElementById("type").value = "Income";
    }
    else {
        
        var description = document.getElementById("description").value;
        
        var amount = document.getElementById("amount").value;
        var type = document.getElementById("type").value;

        const response =    await fetch(
                    `https://676e496ddf5d7dac1cca2c26.mockapi.io/users/${currentUserId}`,
                    {
                        method: "PUT",
                        body: JSON.stringify({ description: description , amount: amount , type: type }),
                        headers: {
                          "Content-Type": "application/json",
                        }
                      }
                    
                  );
                 


const resData = await response.json();

                  
                  isEdit = false;
                  currentUserId = null;
                  gettotalincome();
                  getData();

                  document.getElementById("description").value = "";
                  document.getElementById("amount").value = "";
                  document.getElementById("type").value = "Income";
                
    }
   
  }
 

  async function getData() {

    try {
        if(userincomefilter){
      
            var userData = await fetch(
            "https://676e496ddf5d7dac1cca2c26.mockapi.io/users",
            );
            
            var users = await userData.json();

            
         

            
        
            var content = document.getElementById("content");
        
            content.innerHTML = "";
        
            if (users.length == 0) {
              content.innerHTML = "Empty";
            }
            
            if(expense === true){
                var userfilter = users.filter(filter => filter.type  === "expense")

            }else{
                var userfilter = users.filter(filter => filter.type  === "income")

            }
           

          
      
            
    
            
            for (let index = 0; index <   userfilter.length; index++) {
             
              
      
              content.innerHTML += `<div class="bg-white rounded-lg shadow-lg p-4 mb-3">
                        <div class="flex justify-between items-center text-gray-600">
                          <div>
                            <p>Description : ${userfilter[index].description}</p>
                            <p>Amount : ${userfilter[index].amount}</p>
                            <p>Type : ${userfilter[index].type}</p>
                           
                          </div>
                          <div>
      
                              <button class="bg-blue-500 p-2 rounded-md text-white" onclick="getUserById(${users[index].id})">
                            Edit
                          </button>
                          <button class="bg-red-500 p-2 rounded-md text-white" onclick="deleteUser(${users[index].id})">
                            Delete
                          </button>
                          </div>
                        </div>
                      </div>`;
      
      
            
            }
        }else{
                
      
      var userData = await fetch(
      "https://676e496ddf5d7dac1cca2c26.mockapi.io/users",
      );
      
      var users = await userData.json();
   

      
  
      var content = document.getElementById("content");
  
      content.innerHTML = "";
  
      if (users.length == 0) {
        content.innerHTML = "Empty";
      }



      
      
      
      for (let index = 0; index <   users.length; index++) {
        
        
        

        content.innerHTML += `<div class="bg-white rounded-lg shadow-lg p-4 mb-3">
                  <div class="flex justify-between items-center text-gray-600">
                    <div>
                      <p>Description : ${users[index].description}</p>
                      <p>Amount : ${users[index].amount}</p>
                      <p>Type : ${users[index].type}</p>
                     
                    </div>
                    <div>

                        <button class="bg-blue-500 p-2 rounded-md text-white" onclick="getUserById(${users[index].id})">
                      Edit
                    </button>
                    <button class="bg-red-500 p-2 rounded-md text-white" onclick="deleteUser(${users[index].id})">
                      Delete
                    </button>
                    </div>
                  </div>
                </div>`;


      }
    }
             
      
    } catch (error) {
        
      alert("Something went wrong");
    }
  }


//  async function getUserById(currentUserId){
//     await fetch(
//         `https://5d6a78f96b97ef00145b7a3d.mockapi.io/api/users/${currentUserId}`,
//         {
//           method: "PUT",
//           body: JSON.stringify({
//             description: description,
//             amount: amount,
//             type: type
//           }),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
      

//       document.getElementById("description").value = "";
//       document.getElementById("amount").value = "";
//       document.getElementById("type").value = " ";
//     }


    async function getUserById(userId) {
        try {
          var userData = await fetch(
            `https://676e496ddf5d7dac1cca2c26.mockapi.io/users/${userId}`
          );
          var user = await userData.json();
      
          document.getElementById("description").value = user.description;
          document.getElementById("amount").value = user.amount;
          document.getElementById("type").value = user.type;
         
          isEdit = true;
          currentUserId = userId;
        } catch (error) {
          alert("Something went wrong");
        }
      }
  


  async function deleteUser(userId) {
    try {
      var resp = confirm("Are you sure do you want to delete?");
      if (resp) {
        await fetch(
          `https://676e496ddf5d7dac1cca2c26.mockapi.io/users/${userId}`,
          {
            method: "DELETE",
          }
        );
        gettotalincome();
        getData();
      }
    } catch (error) {
        
        
      alert("Something went wrong");
    }
  }


 


  function getfilterincome(){
   userincomefilter = true;
   expense = false;

  getData()  
    
        
      }

    
    

  function getfilterall(){
    userincomefilter = false;
    expense = false;

  getData() 
    
    
  }

  function getfilterexpense(){
    userincomefilter = true;
    expense = true;
  getData() 
    
    
  }

 async function gettotalincome(){
    var userData = await fetch(
        "https://676e496ddf5d7dac1cca2c26.mockapi.io/users",
        );
        
        var users = await userData.json();
        var totalincome = 0;
        var totalexpense = 0;
       users.forEach(element => {
        
        if(element.type === 'income'){
            totalincome += parseInt(element.amount);
           
           
            getData() 

        }else if(element.type === 'expense'  ){
            
            totalexpense += parseInt(element.amount);
            
           
            getData() 

        }
        incomess.innerHTML = `Rs ${totalincome}`;
        expenses.innerHTML = `Rs ${totalexpense}`;

        var netbalance = totalincome - totalexpense;
        netbt.innerHTML = `Rs ${netbalance}`;

        

        
        
        
       });
        
  }

  gettotalincome()

  getData()
  