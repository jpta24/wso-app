export const textField = (field) =>{
    let spaceArr = [0]
    for (let i = 1; i < field.length; i++) {
        if (field.charAt(i) === field.charAt(i).toUpperCase()) {
            spaceArr.push(i)
        }    
    }
    let newWords =''
    let newPos = 1
    for (let i = 0; i < spaceArr.length; i++) {
           newWords += field[spaceArr[i]].toUpperCase() + field.slice(spaceArr[i]+1,spaceArr[i+1]) + ' '
    }
    return newWords
}