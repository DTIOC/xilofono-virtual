class XylophoneApp {
    constructor() {
        this.synth = null;
        this.isAudioReady = false;
        this.xylophone = document.getElementById('xylophone');
        this.currentMelody = [];
        this.userMelody = [];
        this.scaleNotes = ['C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5'];
        
        // IMPORTANTE: Reemplaza esta URL con la NUEVA que obtengas al crear la nueva implementación en Apps Script
        this.webhookURL = 'https://script.google.com/macros/s/AKfycbxm0y--lAmYDw-muE3Kn0HtjhoDVjxWn6Yri-Mrz4c2l7ICFh-paZhhSHf8ZoemV4a2/exec';
        
        this.currentLevel = 1;
        this.successStreak = 0;
        this.isFamiliarizing = true;
        this.isSimultaneous = false;
        
        this.init();
    }
    
    init() {
        this.createXylophone();
        this.setupEventListeners();
        this.updateUI();
        this.generateNewMelody();
    }
    
    async initAudio() {
        if (!this.synth) {
            await Tone.start();
            
            this.synth = new Tone.PolySynth(Tone.Synth, {
                oscillator: { type: "sine" },
                envelope: { 
                    attack: 0.001,
                    decay: 0.3,
                    sustain: 0,
                    release: 0.5
                },
                volume: -3
            }).toDestination();
            
            const reverb = new Tone.Reverb({ decay: 1.2, wet: 0.25 }).toDestination();
            this.synth.connect(reverb);
            
            this.isAudioReady = true;
            console.log("✅ Xilófono sintético cargado");
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
                    
                    const sharpWidth = 50;
                    key.style.left = `${relativeX - (sharpWidth / 2)}px`;
                    
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
    }

    toggleMode() {
        this.isFamiliarizing = !this.isFamiliarizing;
        const btn = document.getElementById('btnMode');
        if (this.isFamiliarizing) {
            btn.textContent = '🎵 Modo Familiarización';
            btn.classList.add('active-mode');
            document.getElementById('feedback').textContent = '🎵 Modo Práctica: Toca libremente. No se guardan resultados.';
        } else {
            btn.textContent = '📝 Iniciar Evaluación';
            btn.classList.remove('active-mode');
            document.getElementById('feedback').textContent = ' Modo Evaluación: Escucha y repite. ¡Se guardan tus resultados!';
        }
        this.clearUserMelody();
    }
    
    generateNewMelody() {
        this.userMelody = [];
        this.clearKeyboardHighlights();
        document.getElementById('scoreDisplay').style.display = 'none';
        
        let melodyLength = 1;
        this.isSimultaneous = false;

        if (this.currentLevel === 1) {
            melodyLength = 1;
        } else if (this.currentLevel === 2) {
            melodyLength = 2;
        } else if (this.currentLevel === 3) {
            melodyLength = Math.floor(Math.random() * 3) + 3;
        } else if (this.currentLevel === 4) {
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
        feedback.textContent = ' Escuchando...';
        feedback.style.color = '#00d9a5';
        
        const now = Tone.now();
        
        if (this.isSimultaneous) {
            this.currentMelody.forEach((note) => {
                this.synth.triggerAttackRelease(note, '2n', now);
            });
            setTimeout(() => {
                feedback.textContent = '✅ Ahora toca las notas simultáneamente (acorde/intervalo)';
                feedback.style.color = '#fff';
            }, 1500);
        } else {
            this.currentMelody.forEach((note, index) => {
                this.synth.triggerAttackRelease(note, '8n', now + (index * 0.6));
            });
            setTimeout(() => {
                feedback.textContent = '✅ Ahora repite la melodía en el xilófono';
                feedback.style.color = '#fff';
            }, this.currentMelody.length * 600 + 500);
        }
    }
    
    async handleKeyPress(note, keyElement) {
        await this.initAudio();
        
        this.synth.triggerAttackRelease(note, '8n');
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
        document.querySelectorAll('.natural-key, .sharp-key').forEach(key => key.classList.remove('correct', 'incorrect'));
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
                alert(' ¡Increíble! Has completado todos los niveles de entrenamiento.');
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
                    if (sortedTarget[i] !== sortedUser[i]) {
                        allMatch = false;
                        break;
                    }
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
        
        let text = ' Sigue practicando, ¡tú puedes!';
        if (score.percentage === 100) text = '🌟 ¡Perfecto! ¡Excelente oído musical!';
        else if (score.percentage >= 80) text = ' ¡Muy bien! Casi perfecto';
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
                if (keyElement && this.currentMelody.includes(note)) {
                    keyElement.classList.add('correct');
                } else if (keyElement) {
                    keyElement.classList.add('incorrect');
                }
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
        
        // Crear un objeto FormData en lugar de JSON
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
        
        console.log('📤 Enviando datos a:', this.webhookURL);
        
        try {
            const response = await fetch(this.webhookURL, {
                method: 'POST',
                body: formData  // Enviamos FormData en lugar de JSON
            });
            
            const result = await response.text();
            console.log('📥 Respuesta del servidor:', result);
            console.log('✅ Resultado guardado');
            
        } catch (error) {
            console.error('❌ Error al guardar:', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new XylophoneApp();
});
