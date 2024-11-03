const nameInput=document.getElementById("name-input");
const emailInput=document.getElementById("email-input");
const departmentInput=document.getElementById("department-input");
const addressInput=document.getElementById("address-input");
const salaryInput=document.getElementById("salary-input");
const contactInput=document.getElementById("contact-input");
const addBtn=document.getElementById("add-btn");
const tableBody=document.getElementById("table-body");
const updateNameInput=document.getElementById("update-name-input");
const updateEmailInput=document.getElementById("update-email-input");
const updateDepartmentInput=document.getElementById("update-department-input");
const updateAddressInput=document.getElementById("update-address-input");
const updateSalaryInput=document.getElementById("update-salary-input");
const updateContactInput=document.getElementById("update-contact-input");
const updateBtn=document.getElementById("update-btn");
const cancelBtn=document.getElementById("cancel-btn");
let users=JSON.parse(localStorage.getItem("users")) || [];
let currentUserId=null;
const validRegex=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


function renderTable()
{
tableBody.innerHTML="";
for(let i=0;i<users.length;i++)
{
    const user=users[i];
    const tr=document.createElement("tr");
    const idTd=document.createElement("td");
    const nameTd=document.createElement("td");
    const emailTd=document.createElement("td");
    const departmentTd=document.createElement("td");
    const addressTd=document.createElement("td");
    const salaryTd=document.createElement("td");
    const contactTd=document.createElement("td");
    const actionsTd=document.createElement("td");
    const editBtn=document.createElement("button");
    editBtn.className="edit-btn";
    const deleteBtn=document.createElement("button");
    deleteBtn.className="delete-btn";
    idTd.innerText=user.id;
    nameTd.innerText=user.name;
    emailTd.innerText=user.email;
    departmentTd.innerText=user.department;
    addressTd.innerText=user.address;
    salaryTd.innerText=user.salary;
    contactTd.innerText=user.contact;
    editBtn.innerText="Edit";
    deleteBtn.innerText="Delete";
    editBtn.addEventListener("click",()=>
    {
        showUpdateForm(user.id);
    });
    deleteBtn.addEventListener("click",()=>
    {
    deleteUser(user.id);
    });
actionsTd.appendChild(editBtn);
actionsTd.appendChild(deleteBtn);
tr.appendChild(idTd);
tr.appendChild(nameTd);
tr.appendChild(emailTd);
tr.appendChild(departmentTd);
tr.appendChild(addressTd);
tr.appendChild(salaryTd);
tr.appendChild(contactTd);
tr.appendChild(actionsTd);
tableBody.appendChild(tr);
}
}

function addUser()
{
    const name= nameInput.value.trim();
    const email= emailInput.value.trim();
    const department= departmentInput.value.trim();
    const address= addressInput.value.trim();
    const salary= salaryInput.value.trim();
    const contact= contactInput.value.trim();
    if(email.match(validRegex))
    {
        if(name && email && department && address && salary && contact!=null)
        {
            var id = 1;
            var val=users.map(function(x)
            {
                return x.id;
            }).indexOf(id);
                while(val!=-1)
                {
                    id++;
                    val = users.map(function(x)
                    {
                        return x.id;
                    }).indexOf(id);

                }
                const user={id:id,name:name,email:email,department:department,address:address,salary:salary,contact:contact};
                users.push(user);
                localStorage.setItem("users",JSON.stringify(users));
                nameInput.value="";
                emailInput.value="";
                departmentInput.value="";
                addressInput.value="";
                salaryInput.value="";
                contactInput.value="";
                renderTable();
            }
            else
            {
                alert("Name is Required");
            }
        }
        else
        {
                alert("Invalid Email Address!");
        }
    }

function updateUser()
{
    const name= updateNameInput.value;
    const email= updateEmailInput.value;
    const department= updateDepartmentInput.value;
    const address= updateAddressInput.value;
    const salary= updateSalaryInput.value;
    const contact= updateContactInput.value;
    if(email.match(validRegex))
    {
       const index = users.findIndex((user) =>user.id === currentUserId);
       if(index !== -1)
       {
        users[index].name = name;
        users[index].email = email;
        users[index].department =  department;
        users[index].address = address;
        users[index].salary = salary;
        users[index].contact = contact;
        localStorage.setItem("users",JSON.stringify(users));
        hideUpdateForm();
        renderTable();
       }
    }
    else
    {
        alert("Invalid email address!");
    }
}


function showUpdateForm(userId)
{
    const user= users.find((user)=>user.id === userId);
    if(user)
    {
        updateNameInput.value = user.name;
        updateEmailInput.value = user.email;
        updateDepartmentInput.value = user.department;
        updateAddressInput.value = user.address;
        updateSalaryInput.value = user.salary;
        updateContactInput.value = user.contact;
        currentUserId = user.id;
        updateBtn.addEventListener("click",updateUser);
        cancelBtn.addEventListener("click",hideUpdateForm);
        updateBtn.style.display = "inline-block";
        cancelBtn.style.display = "inline-block";
        updateNameInput.style.display = "inline-block";       
        updateEmailInput.style.display = "inline-block";
        updateDepartmentInput.style.display = "inline-block";
        updateAddressInput.style.display = "inline-block";
        updateSalaryInput.style.display = "inline-block";
        updateContactInput.style.display = "inline-block";
        document.getElementById("update-container").style.display="block";
    }
}


function hideUpdateForm()
{
    updateNameInput.value="";
    updateEmailInput.value="";
    updateDepartmentInput.value="";
    updateAddressInput.value="";
    updateSalaryInput.value="";
    updateContactInput.value="";
    currentUserId=null;
        updateBtn.removeEventListener("click",updateUser);
        cancelBtn.removeEventListener("click",hideUpdateForm);
        updateBtn.style.display = "none";
        cancelBtn.style.display = "none";
        updateNameInput.style.display = "none";       
        updateEmailInput.style.display = "none";
        updateDepartmentInput.style.display = "none";
        updateAddressInput.style.display = "none";
        updateSalaryInput.style.display = "none";
        updateContactInput.style.display = "none";
        document.getElementById("update-container").style.display = "none";
}


function deleteUser(userId)
{
    users=users.filter((user)=>user.id !== userId);
    localStorage.setItem("users",JSON.stringify(users));
    if(users.length==0)
    {
        hideUpdateForm();
    };
    renderTable();
}

addBtn.addEventListener("click",adduser);
renderTable();