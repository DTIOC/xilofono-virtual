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

        this.modoGuiaActivo = false;
        this.guiaPart = null;
        this.metroEvent = null;
        this.metronomoSynth = null;
        
        this.volumenNotas = 0.7;
        this.metronomoActivo = true;
        this.masterVolume = null;

        this.melodiaConcierto = [
            {"nota":"C#5","duracion":"8n","tiempo":0.0,"orden":1},
            {"nota":"E5","duracion":"4n","tiempo":0.29,"orden":2},
            {"nota":"C#5","duracion":"8n","tiempo":0.869,"orden":3},
            {"nota":"E5","duracion":"8n","tiempo":1.159,"orden":4},
            {"nota":"C#5","duracion":"4n","tiempo":1.449,"orden":5},
            {"nota":"B4","duracion":"8n","tiempo":2.319,"orden":6},
            {"nota":"A4","duracion":"8n","tiempo":2.608,"orden":7},
            {"nota":"B4","duracion":"2n","tiempo":2.898,"orden":8},
            {"nota":"B4","duracion":"8n","tiempo":3.768,"orden":9},
            {"nota":"A4","duracion":"8n","tiempo":4.058,"orden":10},
            {"nota":"C#5","duracion":"8n","tiempo":4.348,"orden":11},
            {"nota":"B4","duracion":"2n","tiempo":4.637,"orden":12},
            {"nota":"C#5","duracion":"8n","tiempo":6.666,"orden":13},
            {"nota":"D5","duracion":"8n","tiempo":6.956,"orden":14},
            {"nota":"E5","duracion":"4n","tiempo":7.246,"orden":15},
            {"nota":"C#5","duracion":"8n","tiempo":7.826,"orden":16},
            {"nota":"E5","duracion":"2n","tiempo":8.116,"orden":17},
            {"nota":"B4","duracion":"8n","tiempo":9.275,"orden":18},
            {"nota":"A4","duracion":"8n","tiempo":9.565,"orden":19},
            {"nota":"B4","duracion":"4n","tiempo":9.855,"orden":20},
            {"nota":"A4","duracion":"8n","tiempo":10.435,"orden":21},
            {"nota":"B4","duracion":"8n","tiempo":10.724,"orden":22},
            {"nota":"A4","duracion":"8n","tiempo":11.014,"orden":23},
            {"nota":"C#5","duracion":"8n","tiempo":11.304,"orden":24},
            {"nota":"B4","duracion":"2n","tiempo":11.594,"orden":25},
            {"nota":"A4","duracion":"1n","tiempo":13.333,"orden":26},
            {"nota":"B4","duracion":"1n","tiempo":16.811,"orden":27},
            {"nota":"C#5","duracion":"8n","tiempo":19.71,"orden":28},
            {"nota":"D5","duracion":"8n","tiempo":20.0,"orden":29},
            {"nota":"E5","duracion":"4n","tiempo":20.29,"orden":30},
            {"nota":"C#5","duracion":"8n","tiempo":20.869,"orden":31},
            {"nota":"E5","duracion":"8n","tiempo":21.159,"orden":32},
            {"nota":"D5","duracion":"8n","tiempo":21.449,"orden":33},
            {"nota":"C#5","duracion":"8n","tiempo":21.739,"orden":34},
            {"nota":"B4","duracion":"2n","tiempo":22.029,"orden":35},
            {"nota":"B4","duracion":"2n","tiempo":22.898,"orden":36},
            {"nota":"D5","duracion":"2n","tiempo":23.768,"orden":37},
            {"nota":"C#5","duracion":"2n","tiempo":24.637,"orden":38},
            {"nota":"B4","duracion":"2n","tiempo":25.507,"orden":39},
            {"nota":"C#5","duracion":"2n","tiempo":27.246,"orden":40},
            {"nota":"C#5","duracion":"4n","tiempo":28.116,"orden":41},
            {"nota":"B4","duracion":"8n","tiempo":28.695,"orden":42},
            {"nota":"A4","duracion":"2n","tiempo":28.985,"orden":43},
            {"nota":"D5","duracion":"2n","tiempo":30.724,"orden":44},
            {"nota":"D5","duracion":"4n","tiempo":31.594,"orden":45},
            {"nota":"C#5","duracion":"8n","tiempo":32.174,"orden":46},
            {"nota":"B4","duracion":"2n","tiempo":32.464,"orden":47},
            {"nota":"C#5","duracion":"8n","tiempo":33.623,"orden":48},
            {"nota":"D5","duracion":"8n","tiempo":33.913,"orden":49},
            {"nota":"E5","duracion":"1n","tiempo":34.203,"orden":50},
            {"nota":"F#5","duracion":"2n","tiempo":35.942,"orden":51},
            {"nota":"B4","duracion":"8n","tiempo":37.101,"orden":52},
            {"nota":"A4","duracion":"8n","tiempo":37.391,"orden":53},
            {"nota":"B4","duracion":"2n","tiempo":37.681,"orden":54},
            {"nota":"A4","duracion":"8n","tiempo":38.84,"orden":55},
            {"nota":"B4","duracion":"8n","tiempo":39.13,"orden":56},
            {"nota":"C#5","duracion":"8n","tiempo":39.42,"orden":57},
            {"nota":"C#5","duracion":"8n","tiempo":40.0,"orden":58},
            {"nota":"C#5","duracion":"4n","tiempo":40.579,"orden":59},
            {"nota":"A4","duracion":"8n","tiempo":41.159,"orden":60},
            {"nota":"B4","duracion":"8n","tiempo":41.449,"orden":61},
            {"nota":"C#5","duracion":"1n","tiempo":41.739,"orden":62},
            {"nota":"C#5","duracion":"8n","tiempo":43.768,"orden":63},
            {"nota":"B4","duracion":"8n","tiempo":44.058,"orden":64},
            {"nota":"A4","duracion":"8n","tiempo":44.348,"orden":65},
            {"nota":"F#4","duracion":"4n","tiempo":44.637,"orden":66},
            {"nota":"B4","duracion":"2n","tiempo":45.217,"orden":67},
            {"nota":"A4","duracion":"8n","tiempo":46.666,"orden":68},
            {"nota":"B4","duracion":"8n","tiempo":46.956,"orden":69},
            {"nota":"C#5","duracion":"8n","tiempo":47.246,"orden":70},
            {"nota":"B4","duracion":"8n","tiempo":47.536,"orden":71},
            {"nota":"A4","duracion":"8n","tiempo":47.826,"orden":72},
            {"nota":"E4","duracion":"4n","tiempo":48.116,"orden":73},
            {"nota":"C#5","duracion":"1n","tiempo":48.695,"orden":74},
            {"nota":"C#5","duracion":"8n","tiempo":50.724,"orden":75},
            {"nota":"B4","duracion":"8n","tiempo":51.014,"orden":76},
            {"nota":"A4","duracion":"8n","tiempo":51.304,"orden":77},
            {"nota":"E5","duracion":"1n","tiempo":51.594,"orden":78},
            {"nota":"C#5","duracion":"8n","tiempo":54.203,"orden":79},
            {"nota":"B4","duracion":"8n","tiempo":54.492,"orden":80},
            {"nota":"A4","duracion":"8n","tiempo":54.782,"orden":81},
            {"nota":"A4","duracion":"8n","tiempo":55.072,"orden":82},
            {"nota":"C#5","duracion":"8n","tiempo":55.652,"orden":83},
            {"nota":"E5","duracion":"4n","tiempo":55.942,"orden":84},
            {"nota":"C#5","duracion":"8n","tiempo":56.521,"orden":85},
            {"nota":"E5","duracion":"8n","tiempo":56.811,"orden":86},
            {"nota":"C#5","duracion":"4n","tiempo":57.101,"orden":87},
            {"nota":"B4","duracion":"8n","tiempo":57.971,"orden":88},
            {"nota":"A4","duracion":"8n","tiempo":58.261,"orden":89},
            {"nota":"B4","duracion":"2n","tiempo":58.55,"orden":90},
            {"nota":"B4","duracion":"8n","tiempo":59.42,"orden":91},
            {"nota":"A4","duracion":"8n","tiempo":59.71,"orden":92},
            {"nota":"C#5","duracion":"8n","tiempo":60.0,"orden":93},
            {"nota":"B4","duracion":"2n","tiempo":60.29,"orden":94},
            {"nota":"C#5","duracion":"8n","tiempo":62.319,"orden":95},
            {"nota":"D5","duracion":"8n","tiempo":62.608,"orden":96},
            {"nota":"E5","duracion":"4n","tiempo":62.898,"orden":97},
            {"nota":"C#5","duracion":"8n","tiempo":63.478,"orden":98},
            {"nota":"E5","duracion":"2n","tiempo":63.768,"orden":99},
            {"nota":"B4","duracion":"8n","tiempo":64.927,"orden":100},
            {"nota":"A4","duracion":"8n","tiempo":65.217,"orden":101},
            {"nota":"B4","duracion":"4n","tiempo":65.507,"orden":102},
            {"nota":"A4","duracion":"8n","tiempo":66.087,"orden":103},
            {"nota":"B4","duracion":"8n","tiempo":66.377,"orden":104},
            {"nota":"A4","duracion":"8n","tiempo":66.666,"orden":105},
            {"nota":"C#5","duracion":"8n","tiempo":66.956,"orden":106},
            {"nota":"B4","duracion":"2n","tiempo":67.246,"orden":107},
            {"nota":"A4","duracion":"1n","tiempo":68.985,"orden":108},
            {"nota":"B4","duracion":"1n","tiempo":72.464,"orden":109},
            {"nota":"C#5","duracion":"8n","tiempo":75.362,"orden":110},
            {"nota":"D5","duracion":"8n","tiempo":75.652,"orden":111},
            {"nota":"E5","duracion":"4n","tiempo":75.942,"orden":112},
            {"nota":"C#5","duracion":"8n","tiempo":76.521,"orden":113},
            {"nota":"E5","duracion":"8n","tiempo":76.811,"orden":114},
            {"nota":"D5","duracion":"8n","tiempo":77.101,"orden":115},
            {"nota":"C#5","duracion":"8n","tiempo":77.391,"orden":116},
            {"nota":"B4","duracion":"2n","tiempo":77.681,"orden":117},
            {"nota":"B4","duracion":"2n","tiempo":78.55,"orden":118},
            {"nota":"D5","duracion":"2n","tiempo":79.42,"orden":119},
            {"nota":"C#5","duracion":"2n","tiempo":80.29,"orden":120},
            {"nota":"B4","duracion":"2n","tiempo":81.159,"orden":121},
            {"nota":"C#5","duracion":"2n","tiempo":82.898,"orden":122},
            {"nota":"C#5","duracion":"4n","tiempo":83.768,"orden":123},
            {"nota":"B4","duracion":"8n","tiempo":84.348,"orden":124},
            {"nota":"A4","duracion":"2n","tiempo":84.637,"orden":125},
            {"nota":"D5","duracion":"2n","tiempo":86.377,"orden":126},
            {"nota":"D5","duracion":"4n","tiempo":87.246,"orden":127},
            {"nota":"C#5","duracion":"8n","tiempo":87.826,"orden":128},
            {"nota":"B4","duracion":"2n","tiempo":88.116,"orden":129},
            {"nota":"C#5","duracion":"8n","tiempo":89.275,"orden":130},
            {"nota":"D5","duracion":"8n","tiempo":89.565,"orden":131},
            {"nota":"E5","duracion":"1n","tiempo":89.855,"orden":132},
            {"nota":"F#5","duracion":"2n","tiempo":91.594,"orden":133},
            {"nota":"B4","duracion":"8n","tiempo":92.753,"orden":134},
            {"nota":"A4","duracion":"8n","tiempo":93.043,"orden":135},
            {"nota":"B4","duracion":"2n","tiempo":93.333,"orden":136},
            {"nota":"A4","duracion":"8n","tiempo":94.492,"orden":137},
            {"nota":"B4","duracion":"8n","tiempo":94.782,"orden":138},
            {"nota":"C#5","duracion":"8n","tiempo":95.072,"orden":139},
            {"nota":"C#5","duracion":"8n","tiempo":95.652,"orden":140},
            {"nota":"C#5","duracion":"4n","tiempo":96.232,"orden":141},
            {"nota":"A4","duracion":"8n","tiempo":96.811,"orden":142},
            {"nota":"B4","duracion":"8n","tiempo":97.101,"orden":143},
            {"nota":"C#5","duracion":"1n","tiempo":97.391,"orden":144},
            {"nota":"C#5","duracion":"8n","tiempo":99.42,"orden":145},
            {"nota":"B4","duracion":"8n","tiempo":99.71,"orden":146},
            {"nota":"A4","duracion":"8n","tiempo":100.0,"orden":147},
            {"nota":"F#4","duracion":"4n","tiempo":100.29,"orden":148},
            {"nota":"B4","duracion":"2n","tiempo":100.869,"orden":149},
            {"nota":"A4","duracion":"8n","tiempo":102.319,"orden":150},
            {"nota":"B4","duracion":"8n","tiempo":102.608,"orden":151},
            {"nota":"C#5","duracion":"8n","tiempo":102.898,"orden":152},
            {"nota":"B4","duracion":"8n","tiempo":103.188,"orden":153},
            {"nota":"A4","duracion":"8n","tiempo":103.478,"orden":154},
            {"nota":"E4","duracion":"4n","tiempo":103.768,"orden":155},
            {"nota":"C#5","duracion":"1n","tiempo":104.348,"orden":156},
            {"nota":"C#5","duracion":"8n","tiempo":106.377,"orden":157},
            {"nota":"B4","duracion":"8n","tiempo":106.666,"orden":158},
            {"nota":"A4","duracion":"8n","tiempo":106.956,"orden":159},
            {"nota":"E5","duracion":"1n","tiempo":107.246,"orden":160},
            {"nota":"C#5","duracion":"8n","tiempo":109.855,"orden":161},
            {"nota":"B4","duracion":"8n","tiempo":110.145,"orden":162},
            {"nota":"A4","duracion":"8n","tiempo":110.435,"orden":163},
            {"nota":"A4","duracion":"8n","tiempo":110.724,"orden":164},
            {"nota":"A4","duracion":"8n","tiempo":138.55,"orden":165},
            {"nota":"A4","duracion":"1n","tiempo":161.157,"orden":166}
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
            console.log("🎵 Contexto de audio iniciado");
            
            this.masterVolume = new Tone.Volume(-3).toDestination();
            
            const loadPromise = new Promise((resolve) => {
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
                    volume: 0,
                    onload: () => {
                        console.log("✅ Sonidos cargados y listos para tocar");
                        this.isAudioReady = true;
                        resolve();
                    },
                    onerror: (err) => {
                        console.error("❌ ERROR: No se cargaron los sonidos:", err);
                        resolve(); 
                    }
                }).connect(this.masterVolume);
            });

            const reverb = new Tone.Reverb({ decay: 1.2, wet: 0.25 }).connect(this.masterVolume);
            this.sampler.connect(reverb);

            this.metronomoSynth = new Tone.MembraneSynth({
                pitchDecay: 0.008, octaves: 2,
                envelope: { attack: 0.001, decay: 0.1, sustain: 0, release: 0.1 }
            }).connect(this.masterVolume);
            
            this.metronomoSynth.volume.value = -10;

            await loadPromise;
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
            key.addEventListener('touchstart', (e) => { e.preventDefault(); this.handleKeyPress(note, key); });
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
                    key.style.left = `${relativeX - 25}px`;
                    key.addEventListener('mousedown', () => this.handleKeyPress(sharpNote, key));
                    key.addEventListener('touchstart', (e) => { e.preventDefault(); this.handleKeyPress(sharpNote, key); });
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
        document.getElementById('btnGuideMode').addEventListener('click', () => this.toggleModoGuiado());
        document.getElementById('btnRestart').addEventListener('click', () => this.restartExercise());
        
        document.getElementById('bpmSlider').addEventListener('input', (e) => {
            document.getElementById('bpmValue').textContent = e.target.value;
            if (this.modoGuiaActivo) Tone.Transport.bpm.value = parseInt(e.target.value);
        });

        document.getElementById('volumeSlider').addEventListener('input', (e) => {
            const porcentaje = parseInt(e.target.value);
            document.getElementById('volumeValue').textContent = porcentaje;
            this.volumenNotas = porcentaje / 100;
            if (this.masterVolume) {
                const db = porcentaje === 0 ? -40 : (20 * Math.log10(this.volumenNotas));
                this.masterVolume.volume.rampTo(db, 0.1);
            }
        });

        document.getElementById('metroToggle').addEventListener('change', (e) => {
            this.metronomoActivo = e.target.checked;
        });
    }

    toggleMode() {
        this.detenerSecuenciaGuiada();
        this.isFamiliarizing = !this.isFamiliarizing;
        const btn = document.getElementById('btnMode');
        if (this.isFamiliarizing) {
            btn.textContent = '🎵 Modo Familiarización';
            btn.classList.add('active-mode');
            document.getElementById('feedback').textContent = '🎵 Modo Práctica: Toca libremente.';
        } else {
            btn.textContent = '📝 Iniciar Evaluación';
            btn.classList.remove('active-mode');
            document.getElementById('feedback').textContent = '📝 Modo Evaluación: Escucha y repite.';
        }
        this.clearUserMelody();
    }
    
    generateNewMelody() {
        this.detenerSecuenciaGuiada();
        this.userMelody = [];
        this.clearKeyboardHighlights();
        document.getElementById('scoreDisplay').style.display = 'none';
        let melodyLength = this.currentLevel === 1 ? 1 : (this.currentLevel === 2 ? 2 : (this.currentLevel === 3 ? Math.floor(Math.random() * 3) + 3 : Math.floor(Math.random() * 2) + 2));
        this.isSimultaneous = this.currentLevel === 4;

        this.currentMelody = [];
        for (let i = 0; i < melodyLength; i++) {
            this.currentMelody.push(this.scaleNotes[Math.floor(Math.random() * this.scaleNotes.length)]);
        }
        this.updateUI(melodyLength);
        document.getElementById('feedback').textContent = `Presiona "Escuchar" para comenzar ${this.isFamiliarizing ? '(Práctica)' : '(Evaluación)'}`;
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
            this.currentMelody.forEach((note) => this.sampler.triggerAttackRelease(note, '2n', now));
            setTimeout(() => { feedback.textContent = '✅ Ahora toca las notas simultáneamente'; feedback.style.color = '#fff'; }, 1500);
        } else {
            this.currentMelody.forEach((note, index) => this.sampler.triggerAttackRelease(note, '8n', now + (index * 0.6)));
            setTimeout(() => { feedback.textContent = '✅ Ahora repite la melodía'; feedback.style.color = '#fff'; }, this.currentMelody.length * 600 + 500);
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
        document.getElementById('feedback').textContent = `Notas tocadas: ${this.userMelody.map(note => this.convertNoteToSpanish(note)).join(' - ')}`;
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
        document.querySelectorAll('.natural-key, .sharp-key').forEach(key => key.classList.remove('correct', 'incorrect', 'active-guide'));
        document.querySelectorAll('.order-number').forEach(el => el.remove());
    }
    
    checkMelody() {
        const email = document.getElementById('studentEmail').value.trim();
        const name = document.getElementById('studentName').value.trim();
        const group = document.getElementById('studentGroup').value.trim();
        
        if (!email || !name || !group) {
            alert('⚠️ Por favor, completa todos los campos.');
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
            document.getElementById('feedback').innerHTML += '<br><small>(Modo práctica: no se guardó)</small>';
        }
    }

    handleProgression(score) {
        if (score.percentage === 100) {
            this.successStreak++;
            if (this.successStreak >= 2 && this.currentLevel < 4) {
                this.currentLevel++;
                this.successStreak = 0;
                alert(`🎉 ¡Felicidades! Subes al Nivel ${this.currentLevel}.`);
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
        return { percentage: maxNotes === 0 ? 0 : Math.round((correctNotes / maxNotes) * 100), correctNotes, totalNotes: this.currentMelody.length, userNotes: this.userMelody.length };
    }
    
    showResults(score) {
        document.getElementById('scoreDisplay').style.display = 'block';
        document.getElementById('scoreValue').textContent = score.percentage;
        let text = '💪 Sigue practicando';
        if (score.percentage === 100) text = '🌟 ¡Perfecto!';
        else if (score.percentage >= 80) text = '👏 ¡Muy bien!';
        document.getElementById('feedbackText').textContent = text;
        document.getElementById('feedback').innerHTML = `Notas correctas: ${score.correctNotes}/${score.totalNotes}<br><small>Tocaste: ${this.userMelody.map(n => this.convertNoteToSpanish(n)).join(' - ')}</small><br><small>Era: ${this.currentMelody.map(n => this.convertNoteToSpanish(n)).join(this.isSimultaneous ? ' + ' : ' - ')}</small>`;
    }
    
    highlightKeys() {
        this.clearKeyboardHighlights();
        if (this.isSimultaneous) {
            this.userMelody.forEach(note => {
                const keyElement = document.querySelector(`[data-note="${note}"]`);
                if (keyElement) keyElement.classList.add(this.currentMelody.includes(note) ? 'correct' : 'incorrect');
            });
        } else {
            this.userMelody.forEach((note, index) => {
                const keyElement = document.querySelector(`[data-note="${note}"]`);
                if (keyElement) keyElement.classList.add(this.currentMelody[index] === note ? 'correct' : 'incorrect');
            });
        }
    }
    
    async saveToGoogleSheets(score) {
        const formData = new FormData();
        formData.append('timestamp', new Date().toISOString());
        formData.append('email', document.getElementById('studentEmail').value.trim() || 'No especificado');
        formData.append('name', document.getElementById('studentName').value.trim() || 'No especificado');
        formData.append('group', document.getElementById('studentGroup').value.trim() || 'No especificado');
        formData.append('teacher', 'Óscar');
        formData.append('nivel', this.currentLevel);
        formData.append('modo', 'Evaluación');
        formData.append('score', score.percentage);
        formData.append('correctNotes', score.correctNotes);
        formData.append('totalNotes', score.totalNotes);
        try {
            await fetch(this.webhookURL, { method: 'POST', body: formData });
            console.log('✅ Guardado en Google Sheets');
        } catch (error) {
            console.error('❌ Error al guardar:', error);
        }
    }

    toggleModoGuiado() {
        if (this.modoGuiaActivo) this.detenerSecuenciaGuiada();
        else this.iniciarSecuenciaGuiada();
    }

    async iniciarSecuenciaGuiada() {
        await this.initAudio();
        console.log("🎵 Iniciando secuencia guiada...");
        this.modoGuiaActivo = true;
        
        const btn = document.getElementById('btnGuideMode');
        btn.textContent = '⏹️ Detener Práctica';
        btn.classList.add('active-mode');
        document.getElementById('tempoSection').style.display = 'block';
        document.getElementById('feedback').textContent = '🎵 Observa las teclas iluminadas y sigue el pulso.';
        document.getElementById('feedback').style.color = '#FFD700';

        const bpm = parseInt(document.getElementById('bpmSlider').value);
        Tone.Transport.bpm.value = bpm;
        
        Tone.Transport.stop();
        Tone.Transport.cancel();
        
        this.clearKeyboardHighlights();

        // Metrónomo estable empezando exactamente en 0
        this.metroEvent = Tone.Transport.scheduleRepeat((time) => {
            if (this.metronomoActivo) {
                this.metronomoSynth.triggerAttackRelease("C6", "32n", time, 0.5);
                Tone.Draw.schedule(() => {
                    const pulso = document.getElementById('metronomoPulso');
                    if (pulso) {
                        pulso.classList.add('pulso-activo');
                        setTimeout(() => pulso.classList.remove('pulso-activo'), 150);
                    }
                }, time);
            } else {
                Tone.Draw.schedule(() => {
                    const pulso = document.getElementById('metronomoPulso');
                    if (pulso) {
                        pulso.style.background = '#444';
                        setTimeout(() => pulso.style.background = '#666', 150);
                    }
                }, time);
            }
        }, "4n", "0");

        // 🎯 AJUSTE DE SINCRONIZACIÓN:
        // Si el metrónomo suena DESPUÉS de la nota, aumenta este valor (ej. 0.15, 0.2, 0.58)
        // Esto retrasa ligeramente la melodía para que el metrónomo (que empieza en 0) la "espere".
        const offsetMelodia = 0.40; 

        this.guiaPart = new Tone.Part((time, value) => {
            this.sampler.triggerAttackRelease(value.nota, value.duracion, time, this.volumenNotas);
            Tone.Draw.schedule(() => this.resaltarTecla(value.nota, value.orden), time);
        }, this.melodiaConcierto.map(n => [n.tiempo + offsetMelodia, n]));

        this.guiaPart.start(0);
        Tone.Transport.start();

        const ultimaNota = this.melodiaConcierto[this.melodiaConcierto.length - 1];
        const duracionTotal = (ultimaNota.tiempo + offsetMelodia) + 3;
        
        Tone.Transport.schedule(() => {
            this.detenerSecuenciaGuiada();
            document.getElementById('feedback').textContent = '✅ ¡Melodía terminada!';
            document.getElementById('feedback').style.color = '#00d9a5';
        }, duracionTotal);
    }

    detenerSecuenciaGuiada() {
        this.modoGuiaActivo = false;
        Tone.Transport.stop();
        Tone.Transport.cancel();
        if (this.guiaPart) { this.guiaPart.dispose(); this.guiaPart = null; }
        if (this.metroEvent) { Tone.Transport.clear(this.metroEvent); this.metroEvent = null; }
        this.clearKeyboardHighlights();
        
        const btn = document.getElementById('btnGuideMode');
        btn.textContent = '🎓 Modo Práctica Guiada';
        btn.classList.remove('active-mode');
        document.getElementById('tempoSection').style.display = 'none';
        document.getElementById('feedback').textContent = 'Modo Práctica Guiada detenido.';
        document.getElementById('feedback').style.color = '#fff';
    }

    resaltarTecla(nota, orden) {
        document.querySelectorAll('.active-guide').forEach(el => el.classList.remove('active-guide'));
        document.querySelectorAll('.order-number').forEach(el => el.remove());
        const tecla = document.querySelector(`[data-note="${nota}"]`);
        if (tecla) {
            tecla.classList.add('active-guide');
            const numEl = document.createElement('div');
            numEl.className = 'order-number';
            numEl.textContent = orden;
            tecla.appendChild(numEl);
        }
    }

    restartExercise() {
        console.log("🔁 Reiniciando ejercicio...");
        this.detenerSecuenciaGuiada();
        this.userMelody = [];
        this.clearKeyboardHighlights();
        document.getElementById('scoreDisplay').style.display = 'none';
        const feedback = document.getElementById('feedback');
        feedback.style.color = '#fff';
        feedback.textContent = this.isFamiliarizing ? '🎵 Modo Práctica: Toca libremente.' : '📝 Presiona "Escuchar" para volver a intentar.';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new XylophoneApp();
});
