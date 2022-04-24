let _version = 4;
let _title = "My Pine";

function createPine(){
    var output =  document.getElementById("output");
    var indy1 =  document.getElementById("indy1");
    var indy2 =  document.getElementById("indy2");
    var textArea = document.getElementById("outText");
    
    
    indy1Text = indy1.value;
    indy2Text = indy2.value;
    // indy2Text = indy2.options[indy2.selectedIndex].text;
    
    output.setAttribute('style', 'white-space: pre;');

    /////////////////////////// output text////////////////////////
   
   
    ////////////////////////////////////////////////////////////
    textArea.value = createPineCode();
    // output.textContent= createPineCode();
}

function createPineCode(){
    outText = "\/\/@version=" +_version+"\r\n";
    outText += "study(title=\"" + _title + "\", overlay=true)\r\n";
    outText += "s = input(5)\r\n";
    outText += "l = input(21)\r\n";
    outText += "m = input(50)\r\n";
    outText += "short = "+indy1Text+"(close, s)\r\n";
    outText += "long = "+indy2Text+"(close, l)\r\n";
    outText += "medium = sma(close, m)\r\n";
    outText += "plot(short, color = color.red)\r\n";
    outText += "plot(long, color = color.black)\r\n";
    outText += "plot(cross(short, long) ? short : na, style = plot.style_cross, linewidth = 4)\r\n";

    outText += "plot(medium, color = color.blue)";
    return outText;
    // return "test";
}
function myFunction() {
    /* Get the text field */
    var copyText = document.getElementById("outText");
  
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
     /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
  
    /* Alert the copied text */
    // alert("Copied the text: " + copyText.value);
  } 