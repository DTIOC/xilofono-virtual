class XylophoneApp {
    constructor() {
        this.sampler = null;
        this.isAudioReady = false;
        this.xylophone = document.getElementById('xylophone');
        this.currentMelody = [];
        this.userMelody = [];
        
        this.scaleNotes = ['C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5'];
        this.webhookURL = 'https://script.google.com/macros/s/AKfycbzFjmLuFfUtl6BPCsQ4ynRVBxmCcTGQ4Gope2VIwiibuMdaQ2eiaDPkCH22571U-rGQ/exec';
        
        this.currentLevel = 1;
        this.successStreak = 0;
        this.isFamiliarizing = true;
        this.isSimultaneous = false;

        // 🎓 NUEVO: Variables para el Modo Práctica Guiada
        this.modoGuiaActivo = false;
        this.guiaPart = null;
        this.metroLoop = null;
        this.metronomoSynth = null;

        // 🎓 NUEVO: La melodía extraída de tu MIDI (91 notas, ~175s)
        this.melodiaConcierto = [
            {"nota":"C#5","duracion":"1n","tiempo":0.0,"orden":1},
            {"nota":"D5","duracion":"1n","tiempo":3.478,"orden":2},
            {"nota":"E5","duracion":"1n","tiempo":6.957,"orden":3},
            {"nota":"D5","duracion":"1n","tiempo":10.435,"orden":4},
            {"nota":"C#5","duracion":"1n","tiempo":13.913,"orden":5},
            {"nota":"D5","duracion":"1n","tiempo":17.391,"orden":6},
            {"nota":"E5","duracion":"1n","tiempo":20.87,"orden":7},
            {"nota":"D5","duracion":"1n","tiempo":24.348,"orden":8},
            {"nota":"C#5","duracion":"8n","tiempo":28.116,"orden":9},
            {"nota":"D5","duracion":"8n","tiempo":28.406,"orden":10},
            {"nota":"E5","duracion":"2n","tiempo":28.696,"orden":11},
            {"nota":"C#5","duracion":"8n","tiempo":29.855,"orden":12},
            {"nota":"D5","duracion":"8n","tiempo":30.145,"orden":13},
            {"nota":"E5","duracion":"2n","tiempo":30.435,"orden":14},
            {"nota":"A5","duracion":"4n","tiempo":31.304,"orden":15},
            {"nota":"G#5","duracion":"8n","tiempo":31.884,"orden":16},
            {"nota":"F#5","duracion":"8n","tiempo":32.174,"orden":17},
            {"nota":"E5","duracion":"8n","tiempo":32.464,"orden":18},
            {"nota":"D5","duracion":"8n","tiempo":32.754,"orden":19},
            {"nota":"C#5","duracion":"8n","tiempo":33.043,"orden":20},
            {"nota":"B4","duracion":"4n","tiempo":33.333,"orden":21},
            {"nota":"E5","duracion":"1n","tiempo":34.783,"orden":22},
            {"nota":"D5","duracion":"1n","tiempo":38.261,"orden":23},
            {"nota":"C#5","duracion":"1n","tiempo":41.739,"orden":24},
            {"nota":"D5","duracion":"1n","tiempo":45.217,"orden":25},
            {"nota":"E5","duracion":"1n","tiempo":48.696,"orden":26},
            {"nota":"D5","duracion":"1n","tiempo":52.174,"orden":27},
            {"nota":"C#5","duracion":"1n","tiempo":55.652,"orden":28},
            {"nota":"D5","duracion":"1n","tiempo":59.13,"orden":29},
            {"nota":"E5","duracion":"1n","tiempo":62.609,"orden":30},
            {"nota":"D5","duracion":"1n","tiempo":66.087,"orden":31},
            {"nota":"C#5","duracion":"1n","tiempo":69.565,"orden":32},
            {"nota":"D5","duracion":"1n","tiempo":73.043,"orden":33},
            {"nota":"E5","duracion":"1n","tiempo":76.522,"orden":34},
            {"nota":"D5","duracion":"1n","tiempo":80.0,"orden":35},
            {"nota":"C#5","duracion":"8n","tiempo":83.768,"orden":36},
            {"nota":"D5","duracion":"8n","tiempo":84.058,"orden":37},
            {"nota":"E5","duracion":"2n","tiempo":84.348,"orden":38},
            {"nota":"C#5","duracion":"8n","tiempo":85.507,"orden":39},
            {"nota":"D5","duracion":"8n","tiempo":85.797,"orden":40},
            {"nota":"E5","duracion":"2n","tiempo":86.087,"orden":41},
            {"nota":"A5","duracion":"4n","tiempo":86.957,"orden":42},
            {"nota":"G#5","duracion":"8n","tiempo":87.536,"orden":43},
            {"nota":"F#5","duracion":"8n","tiempo":87.826,"orden":44},
            {"nota":"E5","duracion":"8n","tiempo":88.116,"orden":45},
            {"nota":"D5","duracion":"8n","tiempo":88.406,"orden":46},
            {"nota":"C#5","duracion":"8n","tiempo":88.696,"orden":47},
            {"nota":"B4","duracion":"4n","tiempo":88.985,"orden":48},
            {"nota":"E5","duracion":"1n","tiempo":90.435,"orden":49},
            {"nota":"D5","duracion":"1n","tiempo":93.913,"orden":50},
            {"nota":"C#5","duracion":"1n","tiempo":97.391,"orden":51},
            {"nota":"D5","duracion":"1n","tiempo":100.87,"orden":52},
            {"nota":"E5","duracion":"1n","tiempo":104.348,"orden":53},
            {"nota":"D5","duracion":"1n","tiempo":107.826,"orden":54},
            {"nota":"C#5","duracion":"1n","tiempo":111.304,"orden":55},
            {"nota":"D5","duracion":"1n","tiempo":114.783,"orden":56},
            {"nota":"E5","duracion":"1n","tiempo":118.261,"orden":57},
            {"nota":"D5","duracion":"1n","tiempo":121.739,"orden":58},
            {"nota":"E5","duracion":"8n","tiempo":127.826,"orden":59},
            {"nota":"D5","duracion":"8n","tiempo":128.116,"orden":60},
            {"nota":"C#5","duracion":"8n","tiempo":128.406,"orden":61},
            {"nota":"B4","duracion":"2n","tiempo":128.696,"orden":62},
            {"nota":"C#5","duracion":"8n","tiempo":132.464,"orden":63},
            {"nota":"D5","duracion":"8n","tiempo":132.754,"orden":64},
            {"nota":"E5","duracion":"2n","tiempo":133.043,"orden":65},
            {"nota":"C#5","duracion":"8n","tiempo":134.203,"orden":66},
            {"nota":"D5","duracion":"8n","tiempo":134.493,"orden":67},
            {"nota":"E5","duracion":"2n","tiempo":134.783,"orden":68},
            {"nota":"C#5","duracion":"8n","tiempo":135.652,"orden":69},
            {"nota":"B4","duracion":"4n","tiempo":135.942,"orden":70},
            {"nota":"E5","duracion":"8n","tiempo":141.739,"orden":71},
            {"nota":"D5","duracion":"8n","tiempo":142.029,"orden":72},
            {"nota":"C#5","duracion":"8n","tiempo":142.319,"orden":73},
            {"nota":"B4","duracion":"2n","tiempo":142.609,"orden":74},
            {"nota":"E5","duracion":"8n","tiempo":155.652,"orden":75},
            {"nota":"D5","duracion":"8n","tiempo":155.942,"orden":76},
            {"nota":"C#5","duracion":"8n","tiempo":156.232,"orden":77},
            {"nota":"B4","duracion":"2n","tiempo":156.522,"orden":78},
            {"nota":"C#5","duracion":"8n","tiempo":160.29,"orden":79},
            {"nota":"D5","duracion":"8n","tiempo":160.58,"orden":80},
            {"nota":"E5","duracion":"2n","tiempo":160.87,"orden":81},
            {"nota":"C#5","duracion":"8n","tiempo":162.029,"orden":82},
            {"nota":"D5","duracion":"8n","tiempo":162.319,"orden":83},
            {"nota":"E5","duracion":"2n","tiempo":162.609,"orden":84},
            {"nota":"C#5","duracion":"8n","tiempo":163.478,"orden":85},
            {"nota":"B4","duracion":"4n","tiempo":163.768,"orden":86},
            {"nota":"E5","duracion":"8n","tiempo":169.565,"orden":87},
            {"nota":"D5","duracion":"8n","tiempo":169.855,"orden":88},
            {"nota":"C#5","duracion":"8n","tiempo":170.145,"orden":89},
            {"nota":"B4","duracion":"2n","tiempo":170.435,"orden":90},
            {"nota":"C#5","duracion":"1n","tiempo":175.65,"orden":91}
        ];
        
        this.init();
    }
    
    init() {
        this.createXylophone();
        this.setupEventListeners();
        this.updateUI();
        this.generateNewMelody();
    }
    
    async initAudio() {
        if (!this.sampler) {
            await Tone.start();
            
            this.sampler = new Tone.Sampler({
                urls: {
                    "C4": "C4.wav", "C#4": "Cs4.wav", "D4": "D4.wav", "D#4": "Ds4.wav",
                    "E4": "E4.wav", "F4": "F4.wav", "F#4": "Fs4.wav", "G4": "G4.wav",
                    "G#4": "Gs4.wav", "A4": "A4.wav", "A#4": "As4.wav", "B4": "B4.wav",
                    "C5": "C5.wav", "C#5": "Cs5.wav", "D5": "D5.wav", "D#5": "Ds5.wav",
                    "E5": "E5.wav", "F5": "F5.wav", "F#5": "Fs5.wav", "G5": "G5.wav",
                    "G#5": "Gs5.wav", "A5": "A5.wav"
                },
                baseUrl: "./samples/xilofono/",
                volume: -3,
                onload: () => {
                    console.log("✅ Sonidos reales de xilófono cargados correctamente");
                    this.isAudioReady = true;
                },
                onerror: (error) => {
                    console.error("❌ Error al cargar los archivos de audio:", error);
                }
            }).toDestination();
            
            const reverb = new Tone.Reverb({ decay: 1.2, wet: 0.25 }).toDestination();
            this.sampler.connect(reverb);

            // 🎓 NUEVO: Sintetizador para el clic del metrónomo
            this.metronomoSynth = new Tone.MembraneSynth({
                pitchDecay: 0.008, octaves: 2,
                envelope: { attack: 0.001, decay: 0.1, sustain: 0, release: 0.1 }
            }).toDestination();
            this.metronomoSynth.volume.value = -10; // Volumen suave para el clic
        }
        
        if (!this.isAudioReady) {
            return new Promise(resolve => setTimeout(resolve, 100));
        }
    }
    
    createXylophone() {
        const noteLabels = {
            'C4': 'Do', 'C#4': 'Do#', 'D4': 'Re', 'D#4': 'Re#', 'E4': 'Mi',
            'F4': 'Fa', 'F#4': 'Fa#', 'G4': 'Sol', 'G#4': 'Sol#', 'A4': 'La',
            'A#4': 'La#', 'B4': 'Si', 'C5': 'Do', 'C#5': 'Do#', 'D5': 'Re',
            'D#5': 'Re#', 'E5': 'Mi', 'F5': 'Fa', 'F#5': 'Fa#', 'G5': 'Sol',
            'G#5': 'Sol#', 'A5': 'La'
        };
        
        const naturalNotes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5'];
        const sharpPositions = {
            'C#4': 0, 'D#4': 1, 'F#4': 3, 'G#4': 4, 'A#4': 5,
            'C#5': 7, 'D#5': 8, 'F#5': 10, 'G#5': 11
        };
        
        naturalNotes.forEach((note, index) => {
            const key = document.createElement('div');
            key.className = 'natural-key';
            key.dataset.note = note;
            key.dataset.index = index + 1;
            
            const label = document.createElement('span');
            label.className = 'note-label';
            label.textContent = noteLabels[note];
            
            const idx = document.createElement('span');
            idx.className = 'note-index';
            idx.textContent = index + 1;
            
            key.appendChild(label);
            key.appendChild(idx);
            
            key.addEventListener('mousedown', () => this.handleKeyPress(note, key));
            key.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.handleKeyPress(note, key);
            });
            
            this.xylophone.appendChild(key);
        });
        
        setTimeout(() => {
            Object.keys(sharpPositions).forEach((sharpNote) => {
                const position = sharpPositions[sharpNote];
                const naturalKeys = document.querySelectorAll('.natural-key');
                const leftKey = naturalKeys[position];
                const rightKey = naturalKeys[position + 1];
                
                if (leftKey && rightKey) {
                    const leftRect = leftKey.getBoundingClientRect();
                    const rightRect = rightKey.getBoundingClientRect();
                    const containerRect = this.xylophone.getBoundingClientRect();
                    const centerX = (leftRect.right + rightRect.left) / 2;
                    const relativeX = centerX - containerRect.left;
                    
                    const key = document.createElement('div');
                    key.className = 'sharp-key';
                    key.dataset.note = sharpNote;
                    
                    const label = document.createElement('span');
                    label.className = 'note-label';
                    label.textContent = noteLabels[sharpNote];
                    
                    const idx = document.createElement('span');
                    idx.className = 'note-index';
                    idx.textContent = `${position + 1}½`;
                    
                    key.appendChild(label);
                    key.appendChild(idx);
                    key.style.left = `${relativeX - 25}px`; // 50px / 2
                    
                    key.addEventListener('mousedown', () => this.handleKeyPress(sharpNote, key));
                    key.addEventListener('touchstart', (e) => {
                        e.preventDefault();
                        this.handleKeyPress(sharpNote, key);
                    });
                    
                    this.xylophone.appendChild(key);
                }
            });
        }, 100);
    }
    
    setupEventListeners() {
        document.getElementById('btnMode').addEventListener('click', () => this.toggleMode());
        document.getElementById('btnPlay').addEventListener('click', () => this.playMelody());
        document.getElementById('btnGenerate').addEventListener('click', () => this.generateNewMelody());
        document.getElementById('btnCheck').addEventListener('click', () => this.checkMelody());
        document.getElementById('btnClear').addEventListener('click', () => this.clearUserMelody());
        
        // 🎓 NUEVO: Listener para el Modo Práctica Guiada
        document.getElementById('btnGuideMode').addEventListener('click', () => this.toggleModoGuiado());
        
        // 🎓 NUEVO: Listener para el control de velocidad
        document.getElementById('bpmSlider').addEventListener('input', (e) => {
            document.getElementById('bpmValue').textContent = e.target.value;
            if (this.modoGuiaActivo) {
                Tone.Transport.bpm.value = parseInt(e.target.value);
            }
        });
    }

    toggleMode() {
        this.detenerSecuenciaGuiada(); // 🎓 Asegurar que se detenga si cambiamos de modo
        this.isFamiliarizing = !this.isFamiliarizing;
        const btn = document.getElementById('btnMode');
        if (this.isFamiliarizing) {
            btn.textContent = '🎵 Modo Familiarización';
            btn.classList.add('active-mode');
            document.getElementById('feedback').textContent = '🎵 Modo Práctica: Toca libremente. No se guardan resultados.';
        } else {
            btn.textContent = '📝 Iniciar Evaluación';
            btn.classList.remove('active-mode');
            document.getElementById('feedback').textContent = '📝 Modo Evaluación: Escucha y repite. ¡Se guardan tus resultados!';
        }
        this.clearUserMelody();
    }
    
    generateNewMelody() {
        this.detenerSecuenciaGuiada(); // 🎓 Detener guía si se genera nueva melodía
        this.userMelody = [];
        this.clearKeyboardHighlights();
        document.getElementById('scoreDisplay').style.display = 'none';
        
        let melodyLength = 1;
        this.isSimultaneous = false;

        if (this.currentLevel === 1) melodyLength = 1;
        else if (this.currentLevel === 2) melodyLength = 2;
        else if (this.currentLevel === 3) melodyLength = Math.floor(Math.random() * 3) + 3;
        else if (this.currentLevel === 4) {
            melodyLength = Math.floor(Math.random() * 2) + 2;
            this.isSimultaneous = true;
        }

        this.currentMelody = [];
        for (let i = 0; i < melodyLength; i++) {
            const randomNote = this.scaleNotes[Math.floor(Math.random() * this.scaleNotes.length)];
            this.currentMelody.push(randomNote);
        }

        this.updateUI(melodyLength);
        const modeText = this.isFamiliarizing ? '(Práctica)' : '(Evaluación)';
        document.getElementById('feedback').textContent = `Presiona "Escuchar" para comenzar ${modeText}`;
    }

    updateUI(length = 0) {
        document.getElementById('currentLevel').textContent = this.currentLevel;
        document.getElementById('noteCount').textContent = length > 0 ? length : (this.isSimultaneous ? 'Simultáneas' : '0');
        document.getElementById('levelProgress').textContent = `${this.successStreak}/2`;
    }
    
    async playMelody() {
        await this.initAudio();
        const feedback = document.getElementById('feedback');
        feedback.textContent = '🎧 Escuchando...';
        feedback.style.color = '#00d9a5';
        
        const now = Tone.now();
        if (this.isSimultaneous) {
            this.currentMelody.forEach((note) => {
                this.sampler.triggerAttackRelease(note, '2n', now);
            });
            setTimeout(() => {
                feedback.textContent = '✅ Ahora toca las notas simultáneamente (acorde/intervalo)';
                feedback.style.color = '#fff';
            }, 1500);
        } else {
            this.currentMelody.forEach((note, index) => {
                this.sampler.triggerAttackRelease(note, '8n', now + (index * 0.6));
            });
            setTimeout(() => {
                feedback.textContent = '✅ Ahora repite la melodía en el xilófono';
                feedback.style.color = '#fff';
            }, this.currentMelody.length * 600 + 500);
        }
    }
    
    async handleKeyPress(note, keyElement) {
        await this.initAudio();
        this.sampler.triggerAttackRelease(note, '8n');
        keyElement.classList.add('active');
        setTimeout(() => keyElement.classList.remove('active'), 200);
        this.userMelody.push(note);
        this.updateFeedback();
    }
    
    updateFeedback() {
        const feedback = document.getElementById('feedback');
        const notesPlayed = this.userMelody.map(note => this.convertNoteToSpanish(note)).join(' - ');
        feedback.textContent = `Notas tocadas: ${notesPlayed}`;
    }
    
    convertNoteToSpanish(noteCode) {
        const noteMap = { 'C': 'Do', 'D': 'Re', 'E': 'Mi', 'F': 'Fa', 'G': 'Sol', 'A': 'La', 'B': 'Si' };
        const noteLetter = noteCode.charAt(0);
        const accidental = noteCode.charAt(1) === '#' ? '#' : '';
        const octave = noteCode.slice(-1);
        return (noteMap[noteLetter] || noteLetter) + accidental + octave;
    }
    
    clearUserMelody() {
        this.userMelody = [];
        this.updateFeedback();
        this.clearKeyboardHighlights();
        document.getElementById('scoreDisplay').style.display = 'none';
    }
    
    clearKeyboardHighlights() {
        document.querySelectorAll('.natural-key, .sharp-key').forEach(key => {
            key.classList.remove('correct', 'incorrect', 'active-guide');
        });
        document.querySelectorAll('.order-number').forEach(el => el.remove()); // 🎓 Limpiar números
    }
    
    checkMelody() {
        const email = document.getElementById('studentEmail').value.trim();
        const name = document.getElementById('studentName').value.trim();
        const group = document.getElementById('studentGroup').value.trim();
        
        if (!email || !name || !group) {
            alert('⚠️ Por favor, completa todos los campos (correo, nombre y grupo).');
            document.getElementById('studentEmail').focus();
            return;
        }
        
        if (this.userMelody.length === 0) {
            document.getElementById('feedback').textContent = '⚠️ Primero toca algunas notas';
            return;
        }
        
        const score = this.calculateScore();
        this.showResults(score);
        this.highlightKeys();
        
        if (!this.isFamiliarizing) {
            this.handleProgression(score);
            this.saveToGoogleSheets(score);
        } else {
            document.getElementById('feedback').innerHTML += '<br><small>(Modo práctica: no se guardó el resultado)</small>';
        }
    }

    handleProgression(score) {
        if (score.percentage === 100) {
            this.successStreak++;
            if (this.successStreak >= 2 && this.currentLevel < 4) {
                this.currentLevel++;
                this.successStreak = 0;
                alert(`🎉 ¡Felicidades! Has dominado el Nivel ${this.currentLevel - 1} y subes al Nivel ${this.currentLevel}.`);
            } else if (this.currentLevel === 4 && this.successStreak >= 2) {
                alert('🌟 ¡Increíble! Has completado todos los niveles de entrenamiento.');
            }
        } else {
            this.successStreak = 0;
        }
        this.updateUI(this.currentMelody.length);
    }
    
    calculateScore() {
        let correctNotes = 0;
        if (this.isSimultaneous) {
            const sortedTarget = [...this.currentMelody].sort();
            const sortedUser = [...this.userMelody].sort();
            if (sortedTarget.length === sortedUser.length) {
                let allMatch = true;
                for (let i = 0; i < sortedTarget.length; i++) {
                    if (sortedTarget[i] !== sortedUser[i]) { allMatch = false; break; }
                }
                correctNotes = allMatch ? sortedTarget.length : 0;
            }
        } else {
            const minLength = Math.min(this.currentMelody.length, this.userMelody.length);
            for (let i = 0; i < minLength; i++) {
                if (this.currentMelody[i] === this.userMelody[i]) correctNotes++;
            }
        }
        const maxNotes = Math.max(this.currentMelody.length, this.userMelody.length);
        const percentage = maxNotes === 0 ? 0 : Math.round((correctNotes / maxNotes) * 100);
        return { percentage, correctNotes, totalNotes: this.currentMelody.length, userNotes: this.userMelody.length };
    }
    
    showResults(score) {
        const scoreDisplay = document.getElementById('scoreDisplay');
        scoreDisplay.style.display = 'block';
        document.getElementById('scoreValue').textContent = score.percentage;
        
        let text = '💪 Sigue practicando, ¡tú puedes!';
        if (score.percentage === 100) text = '🌟 ¡Perfecto! ¡Excelente oído musical!';
        else if (score.percentage >= 80) text = '👏 ¡Muy bien! Casi perfecto';
        else if (score.percentage >= 60) text = '👍 Bien, sigue practicando';
        
        document.getElementById('feedbackText').textContent = text;
        
        const userNotesSpanish = this.userMelody.map(note => this.convertNoteToSpanish(note)).join(' - ');
        const correctNotesSpanish = this.currentMelody.map(note => this.convertNoteToSpanish(note)).join(this.isSimultaneous ? ' + ' : ' - ');
        
        document.getElementById('feedback').innerHTML = `
            Notas correctas: ${score.correctNotes}/${score.totalNotes}<br>
            <small>Tocaste: ${userNotesSpanish}</small><br>
            <small>Era: ${correctNotesSpanish}</small>
        `;
    }
    
    highlightKeys() {
        this.clearKeyboardHighlights();
        if (this.isSimultaneous) {
            this.userMelody.forEach(note => {
                const keyElement = document.querySelector(`[data-note="${note}"]`);
                if (keyElement && this.currentMelody.includes(note)) keyElement.classList.add('correct');
                else if (keyElement) keyElement.classList.add('incorrect');
            });
            this.currentMelody.forEach(note => {
                if (!this.userMelody.includes(note)) {
                    const keyElement = document.querySelector(`[data-note="${note}"]`);
                    if (keyElement) keyElement.classList.add('incorrect');
                }
            });
        } else {
            this.userMelody.forEach((note, index) => {
                const keyElement = document.querySelector(`[data-note="${note}"]`);
                if (keyElement) {
                    if (this.currentMelody[index] === note) keyElement.classList.add('correct');
                    else keyElement.classList.add('incorrect');
                }
            });
        }
    }
    
    async saveToGoogleSheets(score) {
        const email = document.getElementById('studentEmail').value.trim();
        const name = document.getElementById('studentName').value.trim();
        const group = document.getElementById('studentGroup').value.trim();
        
        const formData = new FormData();
        formData.append('timestamp', new Date().toISOString());
        formData.append('email', email || 'No especificado');
        formData.append('name', name || 'No especificado');
        formData.append('group', group || 'No especificado');
        formData.append('teacher', 'Óscar');
        formData.append('nivel', this.currentLevel);
        formData.append('modo', 'Evaluación');
        formData.append('tipoEjercicio', this.isSimultaneous ? 'Simultáneo (Nivel 4)' : 'Melódico');
        formData.append('melodyLength', this.currentMelody.length);
        formData.append('score', score.percentage);
        formData.append('correctNotes', score.correctNotes);
        formData.append('totalNotes', score.totalNotes);
        formData.append('userMelody', this.userMelody.map(note => this.convertNoteToSpanish(note)).join(this.isSimultaneous ? '+' : '-'));
        formData.append('correctMelody', this.currentMelody.map(note => this.convertNoteToSpanish(note)).join(this.isSimultaneous ? '+' : '-'));
        
        try {
            await fetch(this.webhookURL, { method: 'POST', body: formData });
            console.log('✅ Resultado guardado en Google Sheets');
        } catch (error) {
            console.error('❌ Error al guardar:', error);
        }
    }

    // =========================================================================
    // 🎓 MÉTODOS NUEVOS: MODO PRÁCTICA GUIADA
    // =========================================================================
    
    toggleModoGuiado() {
        if (this.modoGuiaActivo) {
            this.detenerSecuenciaGuiada();
        } else {
            this.iniciarSecuenciaGuiada();
        }
    }

    async iniciarSecuenciaGuiada() {
        await this.initAudio();
        this.modoGuiaActivo = true;
        
        const btn = document.getElementById('btnGuideMode');
        btn.textContent = '⏹️ Detener Práctica';
        btn.classList.add('active-mode');
        document.getElementById('tempoSection').style.display = 'block';
        document.getElementById('feedback').textContent = '🎵 Observa las teclas iluminadas y sigue el pulso del metrónomo.';
        document.getElementById('feedback').style.color = '#FFD700';

        const bpm = parseInt(document.getElementById('bpmSlider').value);
        Tone.Transport.bpm.value = bpm;
        Tone.Transport.stop();
        Tone.Transport.cancel();
        this.clearKeyboardHighlights();

        // 1. Metrónomo (clic en cada negra)
        this.metroLoop = new Tone.Loop((time) => {
            this.metronomoSynth.triggerAttackRelease("C6", "32n", time);
            Tone.Draw.schedule(() => {
                const pulso = document.getElementById('metronomoPulso');
                if (pulso) {
                    pulso.classList.add('pulso-activo');
                    setTimeout(() => pulso.classList.remove('pulso-activo'), 150);
                }
            }, time);
        }, "4n");

        // 2. Melodía guiada
        this.guiaPart = new Tone.Part((time, value) => {
            // Usamos el mismo sampler para que suene idéntico al resto de la app
            this.sampler.triggerAttackRelease(value.nota, value.duracion, time);
            
            // Sincronización visual perfecta con el audio
            Tone.Draw.schedule(() => {
                this.resaltarTecla(value.nota, value.orden);
            }, time);
        }, this.melodiaConcierto.map(n => [n.tiempo, n]));

        this.guiaPart.start(0);
        this.metroLoop.start(0);
        Tone.Transport.start();

        // Detener automáticamente al final
        const duracionTotal = this.melodiaConcierto[this.melodiaConcierto.length - 1].tiempo + 3;
        Tone.Transport.schedule(() => {
            this.detenerSecuenciaGuiada();
            document.getElementById('feedback').textContent = '✅ ¡Melodía terminada! Puedes ajustar la velocidad y volver a intentar.';
            document.getElementById('feedback').style.color = '#00d9a5';
        }, duracionTotal);
    }

    detenerSecuenciaGuiada() {
        this.modoGuiaActivo = false;
        Tone.Transport.stop();
        Tone.Transport.cancel();
        
        if (this.guiaPart) { this.guiaPart.dispose(); this.guiaPart = null; }
        if (this.metroLoop) { this.metroLoop.dispose(); this.metroLoop = null; }
        
        this.clearKeyboardHighlights();
        
        const btn = document.getElementById('btnGuideMode');
        btn.textContent = '🎓 Modo Práctica Guiada';
        btn.classList.remove('active-mode');
        document.getElementById('tempoSection').style.display = 'none';
        document.getElementById('feedback').textContent = 'Modo Práctica Guiada detenido.';
        document.getElementById('feedback').style.color = '#fff';
    }

    resaltarTecla(nota, orden) {
        // Limpiar resaltados anteriores
        document.querySelectorAll('.active-guide').forEach(el => el.classList.remove('active-guide'));
        document.querySelectorAll('.order-number').forEach(el => el.remove());

        // Buscar la tecla por su atributo data-note (funciona para .natural-key y .sharp-key)
        const tecla = document.querySelector(`[data-note="${nota}"]`);
        if (tecla) {
            tecla.classList.add('active-guide');
            
            // Crear el número de orden
            const numEl = document.createElement('div');
            numEl.className = 'order-number';
            numEl.textContent = orden;
            tecla.appendChild(numEl);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new XylophoneApp();
});
