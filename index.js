
// Here we make a function by which we developping div element
function getElementDiv(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// Here We initial hide the parameter boxes because by default the json box is selected
let jsonBox = document.getElementById("jsonBox");
let paramtersboxes = document.getElementById("paramterboxes");
paramtersboxes.style.display = "none";

// There when we click on json box then parameter boxes will be automatically hide
let json = document.getElementById('json')
json.addEventListener("click", () => {
    jsonBox.style.display = 'block'
    paramtersboxes.style.display = "none";
})

// There when we click on parameter(custom) box then json box will be automatically hide
let custom = document.getElementById("custom");
custom.addEventListener("click", () => {
    jsonBox.style.display = "none";
    paramtersboxes.style.display = 'block';
})


// This is a variable we declearing by which we counting parameter boxes and controls its functionality
addParamBoxesIndex = 0;

// Here when we click on custom box then there will show us param list which having  button + when we click on it then, it make more param for us 
let addParamBoxes = document.getElementById("addParamBoxes");
addParamBoxes.addEventListener("click", () => {
    let params = document.getElementById("params");
    let string = ` <div class="form-group row">
                        <label for="ContentType" class="col-sm-2 col-form-label">Paramters ${addParamBoxesIndex + 2}</label>
                        <div class="col-sm-5">
                            <input type="text" class="form-control"  id="Paramterskey${addParamBoxesIndex + 2}" placeholder="param key ${addParamBoxesIndex + 2}">
                        </div>
                           <div class="col-sm-4">
                            <input type="text" class="form-control" id="Paramtersvalue${addParamBoxesIndex + 2}" placeholder=" param value ${addParamBoxesIndex + 2}">
                        </div>
                        <button class="btn btn-primary deletparam" id="deleteParams${addParamBoxesIndex + 2}"> - </button>
                    </div>`;

    let element = getElementDiv(string);
    params.appendChild(element);

    // There is code with the help of this we can able to delete params boxes one by one
    deletparam = document.getElementsByClassName('deletparam')
    for (let item of deletparam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }
    addParamBoxesIndex++;
})


// what will be do or what we wonna when we click on submit button 
let submit = document.getElementById('submit');
submit.addEventListener("click", () => {
    document.getElementById('responsePrism').innerHTML = "Please wait Your request fetching... ";

    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name = 'requesttype']:checked").value;
    let contentType = document.querySelector("input[name = 'contenttype']:checked").value;

    // when we had click on custom box then this code block will be executed
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addParamBoxesIndex + 1; i++) {
            console.log(document.getElementById('Paramterskey' + (i + 2)))
            if (document.getElementById('Paramterskey' + (i + 1)) != undefined) {
                let key = document.getElementById('Paramterskey' + (i + 1)).value;
                let value = document.getElementById("Paramtersvalue" + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    // otherwise this block be exectues when do not have click on custom
    else {
        data = document.getElementById("jsonBoxTextArea").value;
    }


    // This is get request block code means when we have select Get request in request type box
    if (requestType == 'get') {
        fetch(url,
            {
                method: "GET",
            })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            });
    }


    // This is post request block code means when we have select post request in request type box
    else {
        fetch(url,
            {
                method: 'POST',
                body: data,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            });
    }


    // This output will show on console for testing (code work porperly or not)
    // but valueable output will be display on browser window in response box
    console.log("Your fetch Url is ", url);
    console.log("Your request type is", requestType);
    console.log("Your Content type is", contentType);
    console.log("Your data is", data);


})


