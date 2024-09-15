const fs=require('fs')
try{
var data=fs.writeFileSync('./temp.txt','hi its manish again')
console.log('file written sucessfully')
console.log(data)
}
catch(err){
    console.error('an error has been occured',err)
}

// hare the data is printing undefined because this function writefile dont return anythig .it will never give error because if the file 
// path is rong then it creates a new file with the given fike name and insert that data there

// but it is important to use try catch block because it is helpfull in cases 
// such as insufficient permissions, disk full, or invalid file path.