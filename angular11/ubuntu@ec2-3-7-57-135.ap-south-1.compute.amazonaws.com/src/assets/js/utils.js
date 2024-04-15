
export function isSameData(data1, data2, options={}){
    if('object' === typeof data1 && 'object' === typeof data2){
        if(Array.isArray(data1) && Array.isArray(data2)){
            if(data1.length !== data2.length)return false;
            for(let i=0;i<data1.length;i++){
                if(!isSameData(data1[i],data2[i],options)){
                    return false
                }
            }
        }else{
            for(let key in data1){
                if(!options.ignoreKeyCheck){
                    if(!(key in data2))return false;
                }

                if(!isSameData(data1[key],data2[key],options)){
                    return false
                }
            }
        }
        return true
    }

    return data1 === data2
}

export function abbreviateNumber(num, fixed=2) {
    if (num === null) { return null; } // terminate early
    if (num === 0) { return '0'; } // terminate early
    fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
    var b = (num).toPrecision(2).split("e"), // get power
        k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
        c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
        d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
        e = d + ['', 'K', 'M', 'B', 'T'][k]; // append power
    return e;
}

export function CustomDropDown(config = {}){       
    const element = document.querySelector(config.element)
    if (element) {
        const defaultConfig = {
            selectedValuesWidth: '200px',
            searchPlaceHolder: "Type to Search...",
            selectAllText: "Select All",
            deSelectAllText: "De-select All",
            isDefaultDropDownOpen: false,
            onApply(selectedOptions=[],config){
                // console.log('selcted = ', selectedOptions, config)
            }
        }
        config = Object.assign(defaultConfig,config)
        config.isCheckedAll = config.options.every(opt=>opt.selected)
        
        var originalOptionsData = structuredClone(config.options);
        var isDropDownOpen = config.isDefaultDropDownOpen
        var isAnyChanges = false
        var filterSection = null
        var applyBtn = null
        var checkedAllInput = null
        var labelCheckAll = null

        const getArrowIcon = ()=>{

            const svg = document.createElementNS('http://www.w3.org/2000/svg','svg')
            svg.classList.add('option-arrow-icon')
            svg.setAttribute('width','16')
            svg.setAttribute('height','16')
            svg.setAttribute('fill','currentColor')
            svg.setAttribute('viewBox','0 0 16 16')

            const path = document.createElementNS('http://www.w3.org/2000/svg','path')
            path.setAttribute('fill-rule', 'evenodd')
            path.setAttribute('d', 'M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z')
            svg.appendChild(path)
            
            return svg
        }


        // clear the prev childs
        element.innerHTML = ''

        element.style.position = 'relative'
        element.style.width = 'fit-content'
        element.classList.add("custom-dropdown")

        // create label component
        const labelSection = document.createElement("div")
        labelSection.classList.add('label-section')

        const label = document.createElement('div')
        label.innerHTML = config.label

        label.classList.add("label")

        const selectedValuesSection = document.createElement('div')
        // selectedValuesSection.innerHTML = 'HTML, JS, CSS, React.js, Angular, vue, react js ramo'
        selectedValuesSection.classList.add('selected-values-section')
        if(config.selectedValuesWidth)selectedValuesSection.style.width = config.selectedValuesWidth
        
        const labelValueWrapper = document.createElement('div')
        labelValueWrapper.appendChild(label)
        labelValueWrapper.appendChild(selectedValuesSection)

        labelSection.appendChild(labelValueWrapper)
        labelSection.appendChild(getArrowIcon())

        // list wrapper component
        const dropDownContainer = document.createElement('div')
        dropDownContainer.classList.add('dropdown-container')
    
            // create list component
        const list = document.createElement('ul')
        list.style.listStyle = 'none'
        list.style.padding = 0

        const checkIsSame = () => {
            const isSme = isSameData(config.options,originalOptionsData)
            if(isSme){
                isAnyChanges = false
                applyBtn.disabled=true
            }else{
                isAnyChanges = true
                applyBtn.disabled=false
            }
        }

        
        const topFilterSerction = (dropDownContainer) => {
            filterSection = document.createElement('div')
            filterSection.classList.add("filter-section")
            filterSection.style.cursor = 'initial'
            const formCheck = document.createElement('div')
            formCheck.classList.add('form-check')
            
            
            const searchBar = document.createElement('input')
            searchBar.classList.add("form-control")
            searchBar.classList.add("remove-bs-outline")
            searchBar.setAttribute("placeholder", config.searchPlaceHolder)
            searchBar.style.fontSize = "13px"


            const mainDiv = document.createElement('div')
            mainDiv.style.display = 'flex'
            mainDiv.style.justifyContent = 'space-between'
            mainDiv.style.alignItems = 'center'
            mainDiv.style.marginTop = '8px'

            const div = document.createElement('div')
            div.classList.add('form-check')
            checkedAllInput = document.createElement("input")
            const checkBoxId = "cmk"+String(Math.random()).replace('0.','')
            checkedAllInput.classList.add("form-check-input")
            checkedAllInput.setAttribute("type", "checkbox")
            checkedAllInput.setAttribute("id", checkBoxId)                  
            labelCheckAll = document.createElement("label")
            labelCheckAll.classList.add("form-check-label")
            labelCheckAll.setAttribute("for",checkBoxId)
            
            labelCheckAll.style.fontSize = '12px'
            formCheck.appendChild(labelCheckAll)
            div.appendChild(checkedAllInput)
            div.appendChild(labelCheckAll)


            applyBtn = document.createElement('button')
            applyBtn.innerText = 'Apply'
            applyBtn.classList.add('btn','btn-sm','btn-outline-primary')
            applyBtn.disabled = true

            mainDiv.appendChild(div)
            mainDiv.appendChild(applyBtn)

            // dataIndex
            checkedAllInput.onclick = function(e){
                config.isCheckedAll = e.target.checked
                const liList = [...list.childNodes]
                
                liList.forEach(li=>{
                    if(li.cdOption){
                        li.cdOption.selected = config.isCheckedAll;
                        (li.querySelector('.form-check-input').checked = config.isCheckedAll)
                    }
                })
                selectAllCheckBoxAndLabel(config.isCheckedAll)
                checkIsSame()
            }

            applyBtn.onclick = () => {
                originalOptionsData = structuredClone(config.options);
                setInputValue()
                hideDropDown()
                checkIsSame()
                if(config.onApply){
                    config.onApply(config.options.filter(opt=>opt.selected),config)
                }
            }

            searchBar.onkeyup = (e)=>{
                const value = e.target.value.toLowerCase()
                const filterList = config.options.filter(option=>option?.label?.toLowerCase().indexOf(value) != -1 || String(option?.value).indexOf(value) != -1)
                list.innerHTML = ''
                filterList.forEach(createOption)
                if(filterList.length){
                    checkedAllInput.disabled = false
                    selectAllCheckBoxAndLabel(filterList.every(opt=>opt.selected))
                    checkIsSame()
                }else{
                    selectAllCheckBoxAndLabel(false)
                    checkedAllInput.disabled = true
                    applyBtn.disabled = true
                }
            }

            filterSection.appendChild(searchBar)
            filterSection.appendChild(mainDiv)
            
            const hr = document.createElement('hr')
            hr.style.margin = '0'
            hr.style.marginTop = '5px'
            filterSection.appendChild(hr)
            dropDownContainer.appendChild(filterSection)
        }

        const getOnlyBtnElement = ()=>{
            const div = document.createElement('div')
            div.style.backgroundColor = 'rgba(0,0,0,0.12)'
            div.style.textAlign = 'center'
            div.style.marginRight = '10px'
            div.style.padding = '2px 8px'
            div.style.position = 'absolute'
            div.style.borderRadius = '2px'
            div.style.left = '0'
            div.style.top = '0'
            div.innerText = 'Only'

            div.onmouseenter = (e)=>{
                e.stopImmediatePropagation()
                div.style.textDecoration = 'underline'
            }

            div.onmouseleave = (e)=>{
                e.stopImmediatePropagation()
                div.style.textDecoration = 'initial'
            }

            return div
        }

        const createOption = (option = {}, index) => {
            const li = document.createElement("li")
            li.cdDataIndex = index
            li.cdOption = option

            const div = document.createElement('div')
            div.style.display = 'flex'
            div.style.justifyContent = 'space-between'

            const leftSection = document.createElement('div')
            // add checkbox

            // checkbox with label
            const formCheck = document.createElement('div')
            formCheck.classList.add('form-check')
            const checkBoxInput = document.createElement("input")
            const checkBoxId = "cc"+String(Math.random()).replace('0.','')
            checkBoxInput.classList.add("form-check-input")
            checkBoxInput.setAttribute("type", "checkbox")
            checkBoxInput.setAttribute("id", checkBoxId)
            checkBoxInput.checked = Boolean(option.selected)
            formCheck.appendChild(checkBoxInput)
            const formCheckLabel = document.createElement("label")
            formCheckLabel.classList.add("form-check-label")
            formCheckLabel.setAttribute("for",checkBoxId)
            formCheckLabel.innerHTML = option.label
            formCheck.appendChild(formCheckLabel)
            leftSection.appendChild(formCheck)


            const righSection = document.createElement('div')
            righSection.style.position = 'relative'
            righSection.style.fontSize = '90%'
            righSection.style.textAlign = 'right'
            righSection.style.marginLeft = '5px'
            righSection.style.minWidth = '25px'
            righSection.innerHTML = option.value

            checkBoxInput.onclick = (e)=>{
                option.selected = e.target.checked
                selectAllCheckBoxAndLabel(config.options.length ? config.options.every(opt=>opt.selected) : false)
                checkIsSame()
            }

            
            const hoverOnlyEl = getOnlyBtnElement()
            li.onmouseenter = (e)=>{
                righSection.innerHTML = ''
                righSection.appendChild(hoverOnlyEl)
            }

            li.onmouseleave = (e)=>{
                righSection.innerHTML = option.value
            }

            hoverOnlyEl.onclick = (e)=>{
                [...list.childNodes].map(el=>{
                    const ckbox = el.querySelector("input.form-check-input[type='checkbox']")
                    ckbox.checked = ckbox === checkBoxInput 
                    
                })
                config.options = config.options.map(opt=> {opt.selected = false;return opt})
                option.selected = true
                selectAllCheckBoxAndLabel(config.options.length ? config.options.every(opt=>opt.selected) : false)
                checkIsSame()
            }

            div.append(leftSection)
            div.append(righSection)

            li.append(div)
            list.append(li)
        }

        // create options component
        config.options.forEach(createOption)

        topFilterSerction(dropDownContainer, config.che)
        dropDownContainer.append(list)


        const showDropDown = () => {
            isDropDownOpen = true
            dropDownContainer.style.display = 'block'
            dropDownContainer.style.opacity = 1
            labelSection.style.borderBottomRightRadius = 0
            labelSection.style.borderBottomLeftRadius = 0
        }

        const hideDropDown = () => {
            isDropDownOpen = false
            dropDownContainer.style.display = 'none'
            dropDownContainer.style.opacity = 0
            labelSection.style.borderBottomRightRadius = '10px'
            labelSection.style.borderBottomLeftRadius = '10px'
        }

        const selectAllCheckBoxAndLabel = (isSelectAll=config.isCheckedAll)=>{
            checkedAllInput.checked = Boolean(isSelectAll)
            labelCheckAll.innerHTML = isSelectAll ? config.deSelectAllText : config.selectAllText

        }

        const setInputValue = () => {
            const selectedItems = config.options.filter(opt=>opt.selected)
            selectedValuesSection.innerHTML = selectedItems.map(opt=>opt.label).join(', ')
            if(selectedItems.length){
                label.innerHTML = config.label + `&nbsp;&nbsp;(Total Selected: ${selectedItems.length})`
            }else{
                label.innerHTML = config.label
            }

            selectedValuesSection.style.fontSize = '14px'
            if(selectedValuesSection.innerHTML){
                label.style.fontSize = '9px'
                
            }else{
                label.style.fontSize = '15px'
                
            }           
        }

        
        const initCloseDropDownEvent = () => {
            const main = (e) => {  
                if (!dropDownContainer.contains(e.target) && !labelSection.contains(e.target)) {
                    document.removeEventListener("click", main, false)
                    if(isDropDownOpen){
                        hideDropDown()
                    }
                }
            }
            document.addEventListener("click", main, false)
        }

        
        labelSection.addEventListener("click", () => {
            if (isDropDownOpen) {
                hideDropDown()
            }else{
                showDropDown()
                initCloseDropDownEvent()
            }
        }, false)
        

        if (isDropDownOpen) {
            showDropDown()
            initCloseDropDownEvent()
        } else {
            hideDropDown()
        }


        selectAllCheckBoxAndLabel()
        setInputValue()
        element.append(labelSection)
        element.append(dropDownContainer)

    }
    
}
