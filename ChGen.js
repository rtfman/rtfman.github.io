////////// MODEL ///////////
const model = (() => {
    //Arrays for Key, Quality and Extension
    const key = ['A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G','G#/Ab']
    const quality = ['M', 'M6', 'M7', 'm', 'm6', 'm7', 'min/M7', 'm7b5', 'dim', 'dim7', 'aug', 'aug7', 'sus2', 'sus4', '7', '7']
    let extension = ['9', 'b9', '#9', '11', '#11', '#5', '13', 'b13'];
    let randKey, randQual, randEx;

    const rand = (el) => {
        let num = Math.floor(Math.random() * el.length)
        return el[num];
    }

    //Defines Extension so no Repeats/Wierd Chords (e.g. Sus4/11)
    function extensionDefine(qual) {
        if (qual === 'M') {
            return extension = ['9', 'b9', '#9', '11', '#11', '']
        } else if (qual === 'M7') {
            return extension = ['9', 'b9', '#9', '11', '#11','#5', '']
        }else if (qual === 'M6') {
            return extension = ['9', 'b9', '#9', '11', '#11', 'b13', ''] 
        } else if (qual === 'm' || qual === 'm7' || qual === 'min/M7') {
            return extension = ['9', 'b9', '11', '#5', 'b13', '13', '']
        } else if (qual === 'm6') {
            return extension = ['9', 'b9', '11','b13','']
        }else if (qual === 'm7b5') {
            return extension = ['9', 'b9','11', '13', 'b13', ''];
        } else if (qual === 'dim' || qual === 'dim7') {
            return extension = ['9', 'b9', '11', 'b13', '']
        } else if (qual === 'aug' || qual === 'aug7') {
            return extension = ['9', 'b9', '#9', '11', '13', '']
        } else if (qual === 'sus2') {
            return extension = ['b9', '#9', '11', '#11', '13', 'b13','' ]
        } else if (qual === 'sus4') {
            return extension = ['9', 'b9', '#9','#11', '13', 'b13', '']
        } else {
            extension = ['9', 'b9', '#9', '11', '#11', '#5', '13', 'b13', ''];
        }
    }

    return {
        //Random Root and Quality Generator
        genChord: () => {
            randKey = rand(key);
            randQual = rand(quality);
            return {
                key: randKey,
                qual: randQual, 
            }
            
        }, 

        //Random Extension generator
        genEx: () => {
            extensionDefine(randQual)
            randEx = rand(extension);
            //console.log(extension);
            return {ex: randEx};
        },

        getArr: () => {
            return {
                keyArr: key,
                qualArr: quality,
                exArr: extension
            }
        },
    }

})();

///////////CONTROLLER///////////

const controller = (() => {
    let displayRoot, displayQual, displayEx;
    let rootArrAfter, rootArrBefore, fullRootArr, rootIndex;
    let DOMNotes = [];

    let  selectRt, selectQ, selectEx;
    
    const DOMStrings = {
        rootDisp: "root-disp",
        qualDisp: "qual-disp",
        exDisp: "ex-disp"
    }

    

    //Sets DOM Nodes to display Chord Element
    const display = (el, disp) => {
        return disp.textContent = el;}

    //Clears Chord text display
    const textDispClear = (rt, q, ex) => {
        rt.textContent = '';
        q.textContent = '';
        ex.textContent = '';
    }



    //Returns Marker display, html, color to default each click
    const markerReset = () => {
        const mrk = document.querySelectorAll('.mrk');
        for (let i = 0; i < 78; i++) {
            mrk[i].style.display = "none";
            mrk[i].innerHTML = "";
            colorRoot(mrk[i]);
            //mrk[i].style.backgroundColor = "#e01854";
        }
    } 

    //Defines New Root Array starting from curently displayed Root Note 
    const rootArr = (rt) => {
        rootIndex = model.getArr().keyArr.indexOf(rt);
        rootArrAfter = model.getArr().keyArr.slice(rootIndex)
        rootArrBefore = model.getArr().keyArr.slice(0, rootIndex)
        fullRootArr = rootArrAfter.concat(rootArrBefore)
    }

    //Sets colors for note markers
    const colorRoot = (note) => {
        note.style.backgroundColor = "#e01854"//red
    }

    const color3rd = (note) => {
        note.style.backgroundColor = "#9bd5fc"//blue
    }

    const color5th = (note) => {
        note.style.backgroundColor = "#4579d4"//blue
    }

    const color7th = (note) => {
        note.style.backgroundColor = "#54a3e5"//blue
    }

    const colorEx = (note) => {
        note.style.backgroundColor = "#4cc6d3"//teal
    }
    
    //Reorders array of DOM Nodes starting with displayed Root Note
    const DOMNoteArr = () => {
        const c = '.note-c';
        const cSh = '.note-c-sh'
        const d = '.note-d'
        const dSh = '.note-d-sh'
        const e = '.note-e'
        const f = '.note-f'
        const fSh = '.note-f-sh'
        const g = '.note-g'
        const gSh = '.note-g-sh'
        const a = '.note-a'
        const aSh = '.note-a-sh'
        const b = '.note-b'

        const noteArr = [a, aSh, b, c, cSh, d, dSh, e, f, fSh, g, gSh]

        if (fullRootArr[0] === 'A') {
            DOMNotes = noteArr
        } else if (fullRootArr[0] === 'A#/Bb') {
            before = noteArr.slice(1)
            after = noteArr.slice(0, 1)
            DOMNotes = before.concat(after)
        } else if (fullRootArr[0] === 'B') {
            before = noteArr.slice(2)
            after = noteArr.slice(0, 2)
            DOMNotes = before.concat(after)
        } else if (fullRootArr[0] === 'C') {
            before = noteArr.slice(3)
            after = noteArr.slice(0, 3)
            DOMNotes = before.concat(after)
        } else if (fullRootArr[0] === 'C#/Db') {
            before = noteArr.slice(4)
            after = noteArr.slice(0, 4)
            DOMNotes = before.concat(after)
        } else if (fullRootArr[0] === 'D') {
            before = noteArr.slice(5)
            after = noteArr.slice(0, 5)
            DOMNotes = before.concat(after)
        } else if (fullRootArr[0] === 'D#/Eb') {
            before = noteArr.slice(6)
            after = noteArr.slice(0, 6)
            DOMNotes = before.concat(after)
        } else if (fullRootArr[0] === 'E') {
            before = noteArr.slice(7)
            after = noteArr.slice(0, 7)
            DOMNotes = before.concat(after)
        } else if (fullRootArr[0] === 'F') {
            before = noteArr.slice(8)
            after = noteArr.slice(0, 8)
            DOMNotes = before.concat(after)
        } else if (fullRootArr[0] === 'F#/Gb') {
            before = noteArr.slice(9)
            after = noteArr.slice(0, 9)
            DOMNotes = before.concat(after)
        } else if (fullRootArr[0] === 'G') {
            before = noteArr.slice(10)
            after = noteArr.slice(0, 10)
            DOMNotes = before.concat(after)
        } else if (fullRootArr[0] === 'G#/Ab') {
            before = noteArr.slice(11)
            after = noteArr.slice(0, 11)
            DOMNotes = before.concat(after)
        }
    }

    //Displays Root Markers
    const rootMrkDisplay = () => {
        markerReset();

        if (displayRoot === 'C') {
            for (let i = 0; i < 6; i++) {
                let noteC = document.querySelectorAll('.note-c');
                noteC[i].style.display = "block";
                noteC[i].innerHTML = "R";
            }               
        } else if (displayRoot === 'C#/Db') {
            for (let i = 0; i < 6; i++) {
                let noteCSh = document.querySelectorAll('.note-c-sh');
                noteCSh[i].style.display = "block";
                noteCSh[i].innerHTML = "R";
            }
        } else if (displayRoot === 'D') {
            for (let i = 0; i < 7; i++) {
                let noteD = document.querySelectorAll('.note-d');
                noteD[i].style.display = "block";
                noteD[i].innerHTML = "R";
            }                
        } else if (displayRoot === 'D#/Eb') {
            for (let i = 0; i < 6; i++) {
                let noteDSh = document.querySelectorAll('.note-d-sh');
                noteDSh[i].style.display = "block";
                noteDSh[i].innerHTML = "R";
            }
        } else if (displayRoot === 'E') {
            for (let i = 0; i < 8; i++) {
                let noteE = document.querySelectorAll('.note-e');
                noteE[i].style.display = "block";
                noteE[i].innerHTML = "R";
            }
        } else if (displayRoot === 'F') {
            for (let i = 0; i < 6; i++) {
                let noteF = document.querySelectorAll('.note-f');
                noteF[i].style.display = "block";
                noteF[i].innerHTML = "R";
            }
        } else if (displayRoot === 'F#/Gb') {
            for (let i = 0; i < 6; i++) {
                let noteFSh = document.querySelectorAll('.note-f-sh');
                noteFSh[i].style.display = "block";
                noteFSh[i].innerHTML = "R";
            }
        } else if (displayRoot === 'G') {
            for (let i = 0; i < 7; i++) {
                let noteG = document.querySelectorAll('.note-g');
                noteG[i].style.display = "block";
                noteG[i].innerHTML = "R";
            }
        } else if (displayRoot === 'G#/Ab') {
            for (let i = 0; i < 6; i++) {
                let noteGSh = document.querySelectorAll('.note-g-sh');
                noteGSh[i].style.display = "block";
                noteGSh[i].innerHTML = "R";
            }
        } else if (displayRoot === 'A') {
            for (let i = 0; i < 7; i++) {
                let noteA = document.querySelectorAll('.note-a');
                noteA[i].style.display = "block";
                noteA[i].innerHTML = "R";
            }
        } else if (displayRoot === 'A#/Bb') {
            for (let i = 0; i < 6; i++) {
                let noteASh = document.querySelectorAll('.note-a-sh');
                noteASh[i].style.display = "block";
                noteASh[i].innerHTML = "R";
            }
        } else if (displayRoot === 'B') {
            for (let i = 0; i < 7; i++) {
                let noteB = document.querySelectorAll('.note-b');
                noteB[i].style.display = "block";
                noteB[i].innerHTML = "R";
            }
        }
    }
    
    //Displays Quality Markers
    const noteMrkQualStyle = () => {
        let m2 = document.querySelectorAll(`${DOMNotes[1]}`);
        let M2 = document.querySelectorAll(`${DOMNotes[2]}`);
        let m3 = document.querySelectorAll(`${DOMNotes[3]}`);
        let M3 = document.querySelectorAll(`${DOMNotes[4]}`);
        let P4 = document.querySelectorAll(`${DOMNotes[5]}`);
        let d5 = document.querySelectorAll(`${DOMNotes[6]}`);
        let P5 = document.querySelectorAll(`${DOMNotes[7]}`);
        let m6 = document.querySelectorAll(`${DOMNotes[8]}`);
        let M6 = document.querySelectorAll(`${DOMNotes[9]}`);
        let m7 = document.querySelectorAll(`${DOMNotes[10]}`);
        let M7 = document.querySelectorAll(`${DOMNotes[11]}`);

        const qualStyler3rd = (el, tx) => {
            for (let i = 0; i < el.length; i++) {
                el[i].style.display = "block"
                color3rd(el[i]);
                el[i].innerHTML = tx;
            }
        }

        const qualStyler5th = (el, tx) => {
            for (let i = 0; i < el.length; i++) {
                el[i].style.display = "block"
                color5th(el[i]);
                el[i].innerHTML = tx;
            }
        }

        const qualStyler7th = (el, tx) => {
            for (let i = 0; i < el.length; i++) {
                el[i].style.display = "block"
                color7th(el[i]);
                el[i].innerHTML = tx;
            }
        }
        
        if (displayQual === 'M') {
           qualStyler3rd(M3, 'M3');
           qualStyler5th(P5, 'P5');
        } else if (displayQual === 'M6') {
            qualStyler3rd(M3, 'M3');
            qualStyler5th(P5, 'P5');
            qualStyler7th(M6, 'M6');
        } else if (displayQual === 'M7') {
            if(displayEx === '#5') {
                qualStyler3rd(M3, 'M3');
                qualStyler7th(M7, 'M7');
            } else {
                qualStyler3rd(M3, 'M3');
                qualStyler5th(P5, 'P5');
                qualStyler7th(M7, 'M7');
            }
            
        } else if (displayQual === 'm') {
            if (displayEx === '#5') {
                qualStyler3rd(m3, 'm3');
            } else {
                qualStyler3rd(m3, 'm3');
                qualStyler5th(P5, 'P5');
            }
            
        } else if (displayQual === 'm6') {
            qualStyler3rd(m3, 'm3');
            qualStyler5th(P5, 'P5');
            qualStyler7th(M6, 'M6');
        } else if (displayQual === 'm7') {
            if (displayEx === '#5') {
                qualStyler3rd(m3, 'm3');
                qualStyler7th(m7, 'm7');
            } else {
                qualStyler3rd(m3, 'm3');
                qualStyler5th(P5, 'P5');
                qualStyler7th(m7, 'm7');
            }
        } else if (displayQual === 'min/M7') {
            if (displayEx === '#5') {
                qualStyler3rd(m3, 'm3');
                qualStyler7th(M7, 'M7');
            } else {
                qualStyler3rd(m3, 'm3');
                qualStyler5th(P5, 'P5');
                qualStyler7th(M7, 'M7');
            }
            
        } else if (displayQual === 'm7b5') {
            qualStyler3rd(m3, 'm3');
            qualStyler5th(d5, 'b5');
            qualStyler7th(m7, 'm7');
            
        } else if (displayQual === 'dim') {
            qualStyler(m3, 'm3');
            qualStyler(d5, 'b5');
           
        } else if (displayQual === 'dim7') {
            qualStyler3rd(m3, 'm3');
            qualStyler5th(d5, 'b5');
            qualStyler7th(M6, 'd7');
           
        } else if (displayQual === 'aug') {
            qualStyler3rd(M3, 'M3');
            qualStyler5th(m6, '#5');
        } else if (displayQual === 'aug7') {
            qualStyler3rd(M3, 'M3');
            qualStyler5th(m6, '#5');
            qualStyler7th(m7, 'm7');
        } else if (displayQual === 'sus2') {
            qualStyler3rd(M2, 'M2');
            qualStyler5th(P5, 'P5');
        } else if (displayQual === 'sus4') {
            qualStyler3rd(P4, 'P4');
            qualStyler5th(P5, 'P5');

        } else if (displayQual === '7') {
            qualStyler3rd(M3, 'M3');
            qualStyler5th(P5, 'P5');
            qualStyler7th(m7, 'm7');
        }
    }

    //Displays Extension Markers
    const noteMrkExStyle = () => {
        let m2 = document.querySelectorAll(`${DOMNotes[1]}`);
        let M2 = document.querySelectorAll(`${DOMNotes[2]}`);
        let m3 = document.querySelectorAll(`${DOMNotes[3]}`);
        let M3 = document.querySelectorAll(`${DOMNotes[4]}`);
        let P4 = document.querySelectorAll(`${DOMNotes[5]}`);
        let d5 = document.querySelectorAll(`${DOMNotes[6]}`);
        let P5 = document.querySelectorAll(`${DOMNotes[7]}`);
        let m6 = document.querySelectorAll(`${DOMNotes[8]}`);
        let M6 = document.querySelectorAll(`${DOMNotes[9]}`);
        let m7 = document.querySelectorAll(`${DOMNotes[10]}`);
        let M7 = document.querySelectorAll(`${DOMNotes[11]}`);

        const exStyler = (el, tx) => {
            for (let i = 0; i < el.length; i++) {
                el[i].style.display = "block"
                colorEx(el[i]);
                el[i].innerHTML = tx;
            }
        }

        if (displayEx === 'b9') {
            exStyler(m2, 'b9');
        } else if (displayEx === '9') {
            exStyler(M2, '9');
        } else if (displayEx === '#9') {
            exStyler(m3, '#9');
        } else if (displayEx === '11') {
            exStyler(P4, '11');
        } else if (displayEx === '#11') {
            exStyler(d5, '#11');
        } else if (displayEx === '#5') {
            exStyler(m6, '#5');
        } else if (displayEx === 'b13') {
            exStyler(m6, 'b13');
        } else if (displayEx === '13') {
            exStyler(M6, '13');
        }
    }

    return {
        getDomStrings: () => DOMStrings,

        //Display Chord Text from random generator
        getChordDisplay: () => {

            displayRoot = display(model.genChord().key, document.getElementById(DOMStrings.rootDisp))
            displayQual = display(model.genChord().qual, document.getElementById(DOMStrings.qualDisp))
            displayEx = display(model.genEx().ex, document.getElementById(DOMStrings.exDisp))
  
        },

        //Display Chord Text From Chord Menu
        menuChordTextDisp: () => {
            const dispRt = document.getElementById(DOMStrings.rootDisp);
            const dispQ = document.getElementById(DOMStrings.qualDisp);
            const dispEx = document.getElementById(DOMStrings.exDisp);

            textDispClear(dispRt, dispQ, dispEx);
            
            selectRt = document.querySelector('.menu-style.rt').options[document.querySelector('.menu-style.rt').selectedIndex];
            
            selectQ = document.querySelector('.menu-style.q').options[document.querySelector('.menu-style.q').selectedIndex];
            
            selectEx = document.querySelector('.menu-style.ex').options[document.querySelector('.menu-style.ex').selectedIndex];
    
            if(selectRt.value !== "sel") {
                display(selectRt.text, dispRt)
            }
            
            if (selectQ.text !== 'none') {
                display(selectQ.text, dispQ)
            }
            
            if (selectEx.text !== 'none') {
                display(selectEx.text, dispEx)
            }
        },
        

        //Display Note Markers corresponding to Chord menu selections
        menuRootDisp: () => {
            markerReset();
            const select = document.querySelector('.menu-style.rt')
    
            displayRoot = select.options[select.selectedIndex].text;
            
            
            //console.log(displayRoot);
        },

        menuQualDisp: () => {
            markerReset();
            const select = document.querySelector('.menu-style.q')
            displayQual = select.options[select.selectedIndex].text;
            //console.log(displayQual);
        },

        menuExDisp: () => {
            markerReset();
            const select = document.querySelector('.menu-style.ex')
            displayEx = select.options[select.selectedIndex].text;
            //console.log(displayEx);
        },

        //Sets Menu options to default !NOT UPDATING REAL TIME, ONLY ON PAGE INIT!
        menuDispClear: () => {
            selectRt = document.querySelector('.menu-style.rt').options[document.querySelector('.menu-style.rt').selectedIndex].value = "sel";
            //[document.querySelector('.menu-style.rt').selectedIndex];
                
            selectQ = document.querySelector('.menu-style.q').options[document.querySelector('.menu-style.q').selectedIndex].value = "none";
            
            selectEx = document.querySelector('.menu-style.ex').options[document.querySelector('.menu-style.ex').selectedIndex].value = "none";

            console.log(selectRt);
        },

        //Display note markers other than root
        mrkDisp: () => {
            rootArr(displayRoot); 
            DOMNoteArr();
            rootMrkDisplay();
            noteMrkQualStyle();  
            noteMrkExStyle();  
        },


            
    }

})();

///////VIEW/////////////
const view = ((mod, ctrl) => {

    const eventListeners = () => {
        document.getElementById("btn-rand-gen").addEventListener('click', function() {
            ctrl.getChordDisplay();
            ctrl.mrkDisp();
            //ctrl.menuDispClear();
        });

        document.getElementById("btn-menu-gen").addEventListener('click', function() {
            ctrl.menuChordTextDisp();
            ctrl.menuRootDisp();
            ctrl.menuQualDisp();
            ctrl.menuExDisp();
            ctrl.mrkDisp();
        });
    }

    return {
        init: () => {
            console.log('app start')
            ctrl.menuDispClear();
            eventListeners();
        }
    }
})(model, controller);

view.init();