// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Functions

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate() {
      const randIndex = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();
      while (newBase === this.dna[randIndex]) {
        newBase = returnRandBase();
      }
      this.dna[randIndex] = newBase;
      return this.dna;
    },
    compareDNA(pAequor) {
      const similarities = this.dna.reduce((acc, curr, idx, arr) => {
        if (arr[idx] === pAequor.dna[idx]) {
          return acc + 1;
        } else {
          return acc;
        }
      }, 0);
      const percentOfDNAshared = (similarities / this.dna.length) * 100;
      const percentageTo2Deci = percentOfDNAshared.toFixed(2);
      console.log(
        `${this.specimenNum} and ${pAequor.specimenNum} have ${percentageTo2Deci}% DNA in common.`
      );
    },
    willLikelySurvive() {
      const numCG = this.dna.filter((base) => base === "C" || base === "G")
        .length;
      const percentCG = (numCG / this.dna.length) * 100;
      return percentCG >= 60;
    },
    complementStrand() {
      const complement = [];
      for (let i = 0; i < this.dna.length; i++) {
        switch (this.dna[i]) {
          case "A":
            complement.push("T");
            break;
          case "T":
            complement.push("A");
            break;
          case "C":
            complement.push("G");
            break;
          case "G":
            complement.push("C");
            break;
        }
      }
      return complement;
    },
  };
};