/**
 * LS-8 v2.0 emulator skeleton code
 */

const fs = require('fs');

// Instructions
const HLT  = 0b00011011; // Halt CPU
// LDI
const LDI = 0b00000100; // Load Register Immediate
// MUL
const MUL = 0b00000101; // Multiply Register Register
// PRN
const PRN = 0b00000110; // Print (also 6 in binary)

/**
 * Class for simulating a simple Computer (CPU & memory)
 */
class CPU {

    /**
     * Initialize the CPU
     */
    constructor(ram) {
        this.ram = ram;

        this.reg = new Array(8).fill(0); // General-purpose registers -- registers R0 - R7
        
        // Special-purpose registers
        this.reg.PC = 0; // Program Counter
        this.reg.IR = 0; // Instruction Register

		this.setupBranchTable();
    }
	
	/**
	 * Sets up the branch table
	 */
	setupBranchTable() {
		let bt = {};

        bt[HLT] = this.HLT;
        // !!! IMPLEMENT ME -- check
        // LDI
        bt[LDI] = this.LDI;
        // MUL
        bt[MUL] = this.MUL;
        // PRN
        bt[PRN] = this.PRN;

		this.branchTable = bt;
	}

    /**
     * Store value in memory address, useful for program loading
     */
    poke(address, value) {
        this.ram.write(address, value);
    }

    /**
     * Starts the clock ticking on the CPU
     */
    startClock() {
        const _this = this;

        this.clock = setInterval(() => {
            _this.tick();
        }, 1);
    }

    /**
     * Stops the clock
     */
    stopClock() {
        clearInterval(this.clock);
    }

    /**
     * ALU functionality
     * 
     * op can be: ADD SUB MUL DIV INC DEC CMP
     */
    alu(op, regA, regB) {
        // We want valA to be equal to the registerA
        let valA = this.reg[regA];
        let valB = this.reg[regB];

        switch (op) {
            case 'MUL':
                // !!! IMPLEMENT ME -- check
                // We want to execute value_in_regA = valA * valB
                this.reg[regA] = (valA * valB) & 255; // or & 0b11111111
                break;
        }
    }

    /**
     * Advances the CPU one cycle
     */
    tick() {
        // !!! IMPLEMENT ME

        // Load the instruction register from the current PC
        // ^-- Assign into the instruction register from the memory address that the pc points to.
        this.reg.IR = this.ram.read(this.reg.PC);

        // Debugging output
        // console.log(`${this.reg.PC}: ${this.reg.IR.toString(2)}`);

        // Based on the value in the Instruction Register, jump to the
        // appropriate hander in the branchTable
        const handler = this.branchTable[this.reg.IR];

        // Check that the handler is defined, halt if not (invalid
        // instruction)
        if (!handler) {
            console.error(`Invalid instruction at address ${this.reg.PC}: ${this.reg.IR}`);

            // Will halt and quit
            this.stopClock(); // stops the interval OR can call HLT()
            return; // because we don't want to call the handler below
        }
        
        // We need to use call() so we can set the "this" value inside
        // the handler (otherwise it will be undefined in the handler)
        handler.call(this);
    }

    // INSTRUCTION HANDLER CODE:

    /**
     * HLT
     * Halt the CPU and exit the emulator
     */
    HLT() {
        // !!! IMPLEMENT ME - check
        this.stopClock();
    }

    /**
     * LDI R,I
     */
    LDI() {
        // !!! IMPLEMENT ME
    }

    /**
     * MUL R,R
     */
    MUL() {
        // !!! IMPLEMENT ME
        // need to define regA & move the PC
        this.alu('MUL', regA, regB);
    }

    /**
     * PRN R
     */
    PRN() {
        // !!! IMPLEMENT ME
    }
}

module.exports = CPU;