

const formContents = document.querySelectorAll(
  ".form-content1, .form-content2, .form-content3, .form-content4"
);
     const steps = document.querySelectorAll(".step");

let currentStep = 0;
let selectedPlan = null;
let selectedAddons = [];

showStep(currentStep);

    function showStep(step) {
         formContents.forEach((content) => (content.style.display = "none"));
          formContents[step].style.display = "block";


           const circles = document.querySelectorAll(".circle");
            const smallCircles = document.querySelectorAll(".circle_small");

             circles.forEach((circle, i) => {
                   
              circle.classList.toggle("active", i === step);
            });

            smallCircles.forEach((dot, i) => {
                  
             dot.classList.toggle("active", i <= step);
             });
  
          steps.forEach((s, i) => {
          s.classList.toggle("active", i <= step);
     });
      

       document.querySelectorAll(".selected").forEach((el) => {
         el.classList.remove("selected");
     });

}
       document.addEventListener("click", function (e) {
         if (e.target.classList.contains("next")) {
           e.preventDefault();

             if (currentStep === 0) {
               const inputs = document.querySelectorAll(".form-content1 .input-group1 input");
                let allFilled = true;

               inputs.forEach((input) => {
                 if (input.value.trim() === "") {
                     allFilled = false;
                     input.style.border = "2px solid red"; 
                   } else {
                     input.style.border = "1px solid rgba(255,255,255,0.3)"; 
                    }
                 });

                 if (!allFilled) {
                //  alert("Please fill in all the required fields before proceeding.");
                  return; 
                }
             }

         if (currentStep < formContents.length - 1) {
         currentStep++;
          showStep(currentStep);
           if (currentStep === formContents.length - 1) {
               updateSummary();
            }
        }
      }

         if (e.target.classList.contains("goback")) {
          e.preventDefault();
         if (currentStep > 0) {
             if(currentStep===3) {
            selectedAddons=[];
            addonGroups.forEach((g) => g.classList.remove("selected"));
              }
                currentStep--;
               showStep(currentStep);
         }
        }
}); 




const planGroups = document.querySelectorAll(".input-group2");
   planGroups.forEach((group) => {
      group.addEventListener("click", () => {
               planGroups.forEach((g) => g.classList.remove("selected"));
               group.classList.add("selected");

            // Saving the selected plan from the input group 
              const planName = group.querySelector("label").textContent.trim();
              const planPrice = group.querySelector("p").textContent.trim();
             selectedPlan = { name: planName, price: planPrice };
     });
   });


const addonGroups = document.querySelectorAll(".input-group3");
   addonGroups.forEach((group) => {
     group.addEventListener("click", () => {
       group.classList.toggle("selected");

       const addonName = group.querySelector("label[for]").textContent.trim();
         const addonPrice = group.querySelector("p:last-of-type").textContent.trim();

         const exists = selectedAddons.find((a) => a.name === addonName);
           if (exists) {
     
         selectedAddons = selectedAddons.filter((a) => a.name !== addonName);
    } else {
      selectedAddons.push({ name: addonName, price: addonPrice });
    }
  });
});


     function updateSummary() {
         const summaryContainer = document.querySelector(".input-group4");

       if (!summaryContainer) return;

  // Clearing old summary that is the previous selected sections should to be get cleared 
        summaryContainer.innerHTML = "";

        if (selectedPlan) {
    const planDiv = document.createElement("div");
    planDiv.classList.add("summary-plan");
    planDiv.innerHTML = `
    
      <label>${selectedPlan.name}</label>
      <p>${selectedPlan.price}</p>
    
    `;
    summaryContainer.appendChild(planDiv);
  }

           if (selectedAddons.length > 0) {
             const addonsDiv = document.createElement("div");
                 addonsDiv.classList.add("summary-addons");

            selectedAddons.forEach((addon) => {
              const addonItem = document.createElement("div");
                addonItem.classList.add("addon-item");
     
              addonItem.innerHTML = `
              <label>${addon.name}</label>
              <p>${addon.price}</p>
              `;
                addonsDiv.appendChild(addonItem);
            });
            summaryContainer.appendChild(addonsDiv);
          }



//    for the total calculations 
const total = calculateTotal();
const totalContainer = document.createElement("div");
  totalContainer.classList.add("total-charges");
        totalContainer.innerHTML = `
           <label>Total (per month)</label>
           <p>${total}</p>
           `;
  summaryContainer.appendChild(totalContainer);

}
       //calculating the total price of the plans 
      function calculateTotal() {
           let total = 0;

        if (selectedPlan) {
          total += parseFloat(selectedPlan.price.replace(/[^0-9.]/g, ""));
         }

     selectedAddons.forEach((addon) => {
          total += parseFloat(addon.price.replace(/[^0-9.]/g, ""));
      });

  return `$${total}/mo`;
}




