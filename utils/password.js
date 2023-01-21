
const nombreDeCaracteresMinimum = 8
const nombreDeCaracteresMaximun = 64
const caracteresValidesObjet = {
    majuscules: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    minuscule:  'abcdefghijklmnopqrstuvwxyz',
    chiffres: '0123456789',
    caracteresSpeciaux: '²& é~"#\'{([-|è`_\\ç^à@)]°=+}<>,?;.:/!§ù%*µ¨$£¤'
}

/**
 * @param {String} password
 * @returns {string} message d'erreur, 'ok' le mot de passe est complexe
 */
exports.passwordIsComplexe = (password) => {
    if( password.length < nombreDeCaracteresMinimum )
        return 'Le mot de passe est trop court, il doit comporter minimum '+nombreDeCaracteresMinimum+' caractères.'

    if( password.length > nombreDeCaracteresMaximun )
        return 'Le mot de passe est trop long, il doit comporter maximum '+nombreDeCaracteresMaximun+' caractères.'

    let nombreDeMajuscules = 0
    let nombreDeMinuscules = 0
    let nombreDeChiffres = 0
    let nombreDeCaratereSpeciaux = 0

    const passwordArray = password.split('')
    passwordArray.forEach( caractere => {
             if( caracteresValidesObjet.majuscules.indexOf(caractere) >= 0         )     nombreDeMajuscules++
        else if( caracteresValidesObjet.minuscule.indexOf(caractere) >= 0          )     nombreDeMinuscules++
        else if( caracteresValidesObjet.chiffres.indexOf(caractere) >= 0           )     nombreDeChiffres++
        else if( caracteresValidesObjet.caracteresSpeciaux.indexOf(caractere) >= 0 )     nombreDeCaratereSpeciaux++
    })

    if( nombreDeMajuscules + nombreDeMinuscules + nombreDeChiffres + nombreDeCaratereSpeciaux !== password.length )
        return `Le mot de passe doit comtenir seulement les caratères suivants : ${caracteresValidesObjet.caracteresSpeciaux} ${caracteresValidesObjet.majuscules} ${caracteresValidesObjet.minuscule} ${caracteresValidesObjet.chiffres}`

    if( nombreDeMajuscules < 1 || nombreDeMinuscules < 1 || nombreDeChiffres < 1 || nombreDeCaratereSpeciaux < 1 )
        return 'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caratère spécial parmis les suivant : '+caracteresValidesObjet.caracteresSpeciaux


    return 'ok'
}