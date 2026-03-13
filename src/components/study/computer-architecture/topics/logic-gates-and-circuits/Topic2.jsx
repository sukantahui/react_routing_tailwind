// Topic2.jsx - Karnaugh Maps simplification
import React from 'react';
import clsx from 'clsx';

class Topic2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedVariables: 3,
      showSteps: true,
      activePattern: 'adjacent',
      hoveredCell: null,
      minimizedGroups: [],
      currentExpression: '',
      userGroups: [],
      reducedMotion: false,
      kmapData: this.generateKmapData(3),
      showQuineMcCluskey: false
    };
    this.variableOptions = [2, 3, 4];
    this.cellColors = [
      'bg-blue-100 dark:bg-blue-900',
      'bg-green-100 dark:bg-green-900', 
      'bg-yellow-100 dark:bg-yellow-900',
      'bg-purple-100 dark:bg-purple-900',
      'bg-pink-100 dark:bg-pink-900',
      'bg-indigo-100 dark:bg-indigo-900'
    ];
  }

  componentDidMount() {
    this.checkReducedMotion();
    this.generateNewKmap();
    window.addEventListener('resize', this.checkReducedMotion);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkReducedMotion);
  }

  checkReducedMotion = () => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.setState({ reducedMotion: mediaQuery.matches });
  };

  generateKmapData = (variables) => {
    const rows = variables === 2 ? 2 : variables === 3 ? 4 : 4;
    const cols = variables === 2 ? 2 : variables === 3 ? 2 : 4;
    
    const data = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        // Generate random 0 or 1, but with patterns
        const value = Math.random() > 0.5 ? 1 : 0;
        const binaryRow = this.getGrayCode(i, rows);
        const binaryCol = this.getGrayCode(j, cols);
        
        row.push({
          value,
          rowIndex: i,
          colIndex: j,
          binaryRow,
          binaryCol,
          minterm: this.calculateMinterm(i, j, variables),
          isGrouped: false,
          groupId: -1
        });
      }
      data.push(row);
    }
    return data;
  };

  getGrayCode = (index, total) => {
    if (total === 2) return index.toString();
    if (total === 4) {
      const gray = ['00', '01', '11', '10'];
      return gray[index];
    }
    return index.toString();
  };

  calculateMinterm = (row, col, variables) => {
    if (variables === 2) {
      return row * 2 + col;
    } else if (variables === 3) {
      const rowMinterm = row * 2;
      return rowMinterm + col;
    } else {
      const rowMinterm = row * 4;
      return rowMinterm + col;
    }
  };

  generateNewKmap = () => {
    const { selectedVariables } = this.state;
    const kmapData = this.generateKmapData(selectedVariables);
    const groups = this.autoGroupCells(kmapData, selectedVariables);
    const expression = this.generateExpressionFromGroups(groups, selectedVariables);
    
    this.setState({ 
      kmapData, 
      minimizedGroups: groups,
      currentExpression: expression,
      userGroups: []
    });
  };

  autoGroupCells = (kmapData, variables) => {
    const groups = [];
    const rows = kmapData.length;
    const cols = kmapData[0].length;
    const visited = Array(rows).fill().map(() => Array(cols).fill(false));
    
    // Find groups of adjacent 1s (simplified grouping logic)
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (kmapData[i][j].value === 1 && !visited[i][j]) {
          const group = this.findAdjacentGroup(kmapData, i, j, visited, variables);
          if (group.length > 0) {
            groups.push({
              cells: group,
              size: group.length,
              color: this.cellColors[groups.length % this.cellColors.length]
            });
          }
        }
      }
    }
    
    return groups;
  };

  findAdjacentGroup = (kmapData, startRow, startCol, visited, variables) => {
    const group = [];
    const stack = [[startRow, startCol]];
    const rows = kmapData.length;
    const cols = kmapData[0].length;
    
    while (stack.length > 0) {
      const [r, c] = stack.pop();
      if (r < 0 || r >= rows || c < 0 || c >= cols || visited[r][c] || kmapData[r][c].value !== 1) {
        continue;
      }
      
      visited[r][c] = true;
      group.push({ row: r, col: c });
      
      // Check adjacent cells (including wrap-around for K-map)
      const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
      
      // For K-maps, also check wrap-around edges
      if (variables === 4) {
        // Top-bottom wrap
        if (r === 0) directions.push([rows - 1, c]);
        if (r === rows - 1) directions.push([0, c]);
        // Left-right wrap
        if (c === 0) directions.push([r, cols - 1]);
        if (c === cols - 1) directions.push([r, 0]);
      }
      
      directions.forEach(([dr, dc]) => {
        const newRow = (r + dr + rows) % rows;
        const newCol = (c + dc + cols) % cols;
        stack.push([newRow, newCol]);
      });
    }
    
    return group;
  };

  generateExpressionFromGroups = (groups, variables) => {
    if (groups.length === 0) return '0';
    
    const terms = groups.map((group, groupIndex) => {
      return this.groupToTerm(group, variables, groupIndex);
    });
    
    return terms.join(' + ');
  };

  groupToTerm = (group, variables, groupIndex) => {
    const { kmapData } = this.state;
    const cells = group.cells;
    
    if (variables === 2) {
      // For 2 variables
      const rows = [0, 1];
      const cols = [0, 1];
      
      const coveredRows = [...new Set(cells.map(cell => cell.row))].sort();
      const coveredCols = [...new Set(cells.map(cell => cell.col))].sort();
      
      let term = '';
      if (coveredRows.length === 1) {
        term += coveredRows[0] === 0 ? 'Ā' : 'A';
      }
      if (coveredCols.length === 1) {
        term += coveredCols[0] === 0 ? 'B̄' : 'B';
      }
      
      return term || `Group ${groupIndex + 1}`;
    }
    
    // For 3-4 variables
    return `Term ${groupIndex + 1}`;
  };

  handleVariableChange = (variables) => {
    this.setState({ selectedVariables: variables }, () => {
      this.generateNewKmap();
    });
  };

  handleCellClick = (row, col) => {
    const { kmapData, userGroups } = this.state;
    const newData = [...kmapData];
    newData[row][col].value = newData[row][col].value === 1 ? 0 : 1;
    
    this.setState({ kmapData: newData }, () => {
      const groups = this.autoGroupCells(newData, this.state.selectedVariables);
      const expression = this.generateExpressionFromGroups(groups, this.state.selectedVariables);
      this.setState({ 
        minimizedGroups: groups,
        currentExpression: expression 
      });
    });
  };

  handleCellHover = (row, col) => {
    this.setState({ hoveredCell: { row, col } });
  };

  renderKmapGrid = () => {
    const { kmapData, selectedVariables, hoveredCell, minimizedGroups } = this.state;
    const rows = kmapData.length;
    const cols = kmapData[0].length;
    
    return (
      <div className="relative">
        <div className="grid gap-1" style={{
          gridTemplateColumns: `auto repeat(${cols}, minmax(60px, 1fr))`
        }}>
          {/* Column headers */}
          <div className="p-3"></div>
          {Array.from({ length: cols }).map((_, colIndex) => (
            <div key={`col-${colIndex}`} className="p-3 text-center font-bold bg-gray-100 dark:bg-gray-800 rounded">
              {selectedVariables === 2 ? colIndex : 
               selectedVariables === 3 ? colIndex :
               this.getGrayCode(colIndex, cols)}
            </div>
          ))}
          
          {/* Rows */}
          {kmapData.map((row, rowIndex) => (
            <React.Fragment key={`row-${rowIndex}`}>
              {/* Row header */}
              <div className="p-3 text-center font-bold bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">
                {selectedVariables === 2 ? rowIndex : 
                 selectedVariables === 3 ? this.getGrayCode(rowIndex, rows) :
                 this.getGrayCode(rowIndex, rows)}
              </div>
              
              {/* Cells */}
              {row.map((cell, colIndex) => {
                const isHovered = hoveredCell && hoveredCell.row === rowIndex && hoveredCell.col === colIndex;
                const group = minimizedGroups.find(g => 
                  g.cells.some(c => c.row === rowIndex && c.col === colIndex)
                );
                
                return (
                  <div
                    key={`cell-${rowIndex}-${colIndex}`}
                    className={clsx(
                      "relative p-4 rounded border-2 cursor-pointer transition-all duration-300 flex items-center justify-center",
                      "hover:scale-110 hover:z-10 hover:shadow-xl",
                      cell.value === 1 
                        ? group 
                          ? `${group.color} border-current` 
                          : "bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700"
                        : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700",
                      isHovered && "ring-2 ring-yellow-400 ring-opacity-50"
                    )}
                    onClick={() => this.handleCellClick(rowIndex, colIndex)}
                    onMouseEnter={() => this.handleCellHover(rowIndex, colIndex)}
                    onMouseLeave={() => this.handleCellHover(null, null)}
                  >
                    <span className={clsx(
                      "text-2xl font-bold",
                      cell.value === 1 
                        ? "text-blue-800 dark:text-blue-300" 
                        : "text-gray-500 dark:text-gray-500"
                    )}>
                      {cell.value}
                    </span>
                    
                    {/* Minterm label */}
                    <div className="absolute top-1 left-1 text-xs text-gray-500 dark:text-gray-400">
                      m{cell.minterm}
                    </div>
                    
                    {/* Group indicator */}
                    {group && (
                      <div className="absolute bottom-1 right-1">
                        <div className={clsx(
                          "w-3 h-3 rounded-full",
                          group.color.includes('blue') && "bg-blue-500",
                          group.color.includes('green') && "bg-green-500",
                          group.color.includes('yellow') && "bg-yellow-500",
                          group.color.includes('purple') && "bg-purple-500"
                        )} />
                      </div>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
        
        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-3">
          {minimizedGroups.map((group, idx) => (
            <div key={idx} className="flex items-center">
              <div className={clsx("w-4 h-4 rounded mr-2", group.color)} />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Group {idx + 1} ({group.size} cells)
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  renderPatternExamples = () => {
    const patterns = [
      {
        name: 'Adjacent Pairs',
        description: 'Two adjacent 1s eliminate one variable',
        example: 'A·B̄ + A·B = A',
        cells: [[0,0], [0,1]]
      },
      {
        name: 'Quad Group',
        description: 'Four 1s in square eliminate two variables',
        example: 'A·B·C + A·B·C̄ + Ā·B·C + Ā·B·C̄ = B',
        cells: [[0,0], [0,1], [1,0], [1,1]]
      },
      {
        name: 'Wrap-around Edge',
        description: 'K-maps wrap around edges (torus topology)',
        example: 'Cells on opposite edges are adjacent',
        cells: [[0,0], [0,3]] // For 4-variable
      },
      {
        name: 'Octet',
        description: 'Eight 1s eliminate three variables',
        example: 'All 1s in two adjacent rows or columns',
        cells: [[0,0], [0,1], [0,2], [0,3], [1,0], [1,1], [1,2], [1,3]]
      }
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {patterns.map((pattern, idx) => (
          <div
            key={idx}
            className={clsx(
              "p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg",
              "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            )}
          >
            <h4 className="font-bold text-gray-800 dark:text-white mb-2">{pattern.name}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{pattern.description}</p>
            <code className="block p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono text-blue-600 dark:text-blue-400">
              {pattern.example}
            </code>
          </div>
        ))}
      </div>
    );
  };

  renderStepByStep = () => {
    const steps = [
      {
        step: 1,
        title: "Plot 1s on K-map",
        description: "Transfer truth table outputs to corresponding K-map cells",
        tip: "Swadeep always double-checks minterm numbers"
      },
      {
        step: 2,
        title: "Group adjacent 1s",
        description: "Form largest possible groups of 2, 4, 8, etc. following rules",
        tip: "Groups can wrap around edges (torus topology)"
      },
      {
        step: 3,
        title: "Write product terms",
        description: "For each group, write product term of variables that don't change",
        tip: "Variables that change within group are eliminated"
      },
      {
        step: 4,
        title: "Sum the terms",
        description: "Combine all product terms with OR to get minimized expression",
        tip: "Tuhina verifies by comparing with original truth table"
      },
      {
        step: 5,
        title: "Verify simplification",
        description: "Ensure minimized expression matches all original outputs",
        tip: "Use Boolean algebra to verify equivalence"
      }
    ];

    return (
      <div className="space-y-4">
        {steps.map((step) => (
          <div
            key={step.step}
            className={clsx(
              "p-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02]",
              "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
              "border-blue-200 dark:border-blue-800"
            )}
          >
            <div className="flex items-start">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-white font-bold">{step.step}</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 dark:text-white">{step.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{step.description}</p>
                <div className="mt-2 p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                  <span className="text-xs text-blue-600 dark:text-blue-400">💡 {step.tip}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  renderQuineMcCluskey = () => {
    return (
      <div className="mt-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border-2 border-purple-200 dark:border-purple-800">
        <h4 className="font-bold text-purple-800 dark:text-purple-300 mb-3">Quine-McCluskey Method (Tabular Method)</h4>
        <p className="text-purple-700 dark:text-purple-400 mb-4">
          Systematic method for minimizing Boolean functions with more than 4 variables.
          Used by Abhronila for complex Ichapur automation systems.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              step: "List minterms",
              desc: "Write all minterms where output is 1",
              example: "m0, m1, m3, m7"
            },
            {
              step: "Group by 1s count",
              desc: "Group minterms by number of 1s in binary",
              example: "0 ones: m0, 1 one: m1, 2 ones: m3, 3 ones: m7"
            },
            {
              step: "Compare & combine",
              desc: "Combine terms that differ by one bit",
              example: "m0(000) + m1(001) = 00-"
            }
          ].map((item, idx) => (
            <div key={idx} className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <div className="font-bold text-purple-700 dark:text-purple-300">{item.step}</div>
              <div className="text-sm text-purple-600 dark:text-purple-400">{item.desc}</div>
              <code className="block mt-1 text-xs font-mono bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 p-1 rounded">
                {item.example}
              </code>
            </div>
          ))}
        </div>
      </div>
    );
  };

  render() {
    const { 
      selectedVariables, 
      showSteps, 
      currentExpression, 
      minimizedGroups,
      showQuineMcCluskey,
      reducedMotion 
    } = this.state;

    const animationClass = reducedMotion 
      ? "" 
      : "animate-[fadeInUp_0.6s_ease-out_forwards] opacity-0";

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/20 p-4 md:p-8 transition-colors duration-300">
        <style>
          {`
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.7; }
            }
            @media (prefers-reduced-motion: reduce) {
              * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
              }
            }
            .kmap-cell {
              transition: all 0.3s ease;
            }
            .group-highlight {
              animation: pulse 2s infinite;
            }
          `}
        </style>

        {/* Header */}
        <header className={`max-w-6xl mx-auto mb-12 ${animationClass}`}>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4 leading-relaxed">
            Karnaugh Maps: Visual Boolean Simplification
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Master the visual method for minimizing Boolean expressions using 
            Karnaugh Maps - essential for optimizing digital circuits and reducing chip complexity.
          </p>
        </header>

        <main className="max-w-6xl mx-auto">
          {/* Interactive K-map Section */}
          <section className={`mb-16 ${animationClass}`} style={{ animationDelay: "0.1s" }}>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-8 pb-2 border-b border-gray-200 dark:border-gray-700">
              Interactive Karnaugh Map
            </h2>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-4 mb-6">
                {this.variableOptions.map((num) => (
                  <button
                    key={num}
                    onClick={() => this.handleVariableChange(num)}
                    className={clsx(
                      "px-6 py-3 rounded-lg font-bold transition-all duration-300",
                      selectedVariables === num
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    )}
                  >
                    {num} Variables
                  </button>
                ))}
                
                <button
                  onClick={this.generateNewKmap}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-bold hover:shadow-lg transition-all duration-300 ml-auto"
                >
                  Generate New Map
                </button>
                
                <button
                  onClick={() => this.setState({ showSteps: !showSteps })}
                  className={clsx(
                    "px-6 py-3 rounded-lg font-bold transition-all duration-300",
                    showSteps
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                      : "bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300"
                  )}
                >
                  {showSteps ? "Hide" : "Show"} Steps
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  {this.renderKmapGrid()}
                  
                  {/* Minimized Expression */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-purple-800 dark:text-purple-300">Minimized Expression:</h4>
                        <code className="text-lg font-mono text-purple-600 dark:text-purple-400">
                          F = {currentExpression}
                        </code>
                      </div>
                      <div className="text-sm text-purple-600 dark:text-purple-400">
                        {minimizedGroups.length} groups, {selectedVariables} variables
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-purple-700 dark:text-purple-500">
                      Click cells to toggle 0/1. Groups update automatically.
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                    <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-3">Grouping Rules</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span className="text-blue-700 dark:text-blue-400 text-sm">Groups must be rectangular</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span className="text-blue-700 dark:text-blue-400 text-sm">Size must be power of 2 (1,2,4,8,16)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span className="text-blue-700 dark:text-blue-400 text-sm">Groups can wrap around edges</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span className="text-blue-700 dark:text-blue-400 text-sm">Each 1 must be in at least one group</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span className="text-blue-700 dark:text-blue-400 text-sm">Make groups as large as possible</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span className="text-blue-700 dark:text-blue-400 text-sm">Minimize total number of groups</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mt-4 p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border-2 border-green-200 dark:border-green-800">
                    <h4 className="font-bold text-green-800 dark:text-green-300 mb-3">Quick Stats</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-green-700 dark:text-green-400">Variables:</span>
                        <span className="font-bold">{selectedVariables}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700 dark:text-green-400">Total Cells:</span>
                        <span className="font-bold">{Math.pow(2, selectedVariables)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700 dark:text-green-400">Groups Found:</span>
                        <span className="font-bold">{minimizedGroups.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700 dark:text-green-400">1s Count:</span>
                        <span className="font-bold">
                          {this.state.kmapData.flat().filter(cell => cell.value === 1).length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Step-by-Step Guide */}
          {showSteps && (
            <section className={`mb-16 ${animationClass}`} style={{ animationDelay: "0.2s" }}>
              <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-8 pb-2 border-b border-gray-200 dark:border-gray-700">
                Step-by-Step Simplification Process
              </h2>
              {this.renderStepByStep()}
            </section>
          )}

          {/* Pattern Recognition */}
          <section className={`mb-16 ${animationClass}`} style={{ animationDelay: "0.3s" }}>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-8 pb-2 border-b border-gray-200 dark:border-gray-700">
              Common Grouping Patterns
            </h2>
            {this.renderPatternExamples()}
          </section>

          {/* Real-World Applications */}
          <section className={`mb-16 ${animationClass}`} style={{ animationDelay: "0.4s" }}>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-8 pb-2 border-b border-gray-200 dark:border-gray-700">
              Real-World Applications
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Swadeep's Traffic Light Controller (Barrackpore)",
                  description: "Used 4-variable K-map to minimize pedestrian crossing logic, reducing IC count from 6 to 3.",
                  expression: "F = A·B̄ + A·C + B·C̄",
                  variables: 4
                },
                {
                  title: "Tuhina's Exam Hall Allocation (Shyamnagar College)",
                  description: "3-variable K-map optimized room assignment logic for 8 exam halls based on 3 constraints.",
                  expression: "F = A + B·C",
                  variables: 3
                },
                {
                  title: "Abhronila's Irrigation System (Ichapur Farm)",
                  description: "Used K-maps to minimize sensor logic for automated watering, saving 40% power.",
                  expression: "F = Ā·B + A·B̄ + C",
                  variables: 3
                }
              ].map((project, idx) => (
                <div
                  key={idx}
                  className={clsx(
                    "p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
                    "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  )}
                >
                  <div className="flex items-center mb-3">
                    <div className={clsx(
                      "w-10 h-10 rounded-full flex items-center justify-center mr-3",
                      idx === 0 && "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400",
                      idx === 1 && "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400",
                      idx === 2 && "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400"
                    )}>
                      {idx + 1}
                    </div>
                    <h3 className="font-bold text-gray-800 dark:text-white">{project.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {project.description}
                  </p>
                  
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <code className="font-mono text-blue-600 dark:text-blue-400">{project.expression}</code>
                      <span className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                        {project.variables} variables
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Minimized using {project.variables}-variable K-map
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Advanced Topics */}
          <section className={`mb-16 ${animationClass}`} style={{ animationDelay: "0.5s" }}>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-8 pb-2 border-b border-gray-200 dark:border-gray-700">
              Advanced Topics & Professional Methods
            </h2>
            
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  Beyond Basic K-maps
                </h3>
                <button
                  onClick={() => this.setState({ showQuineMcCluskey: !showQuineMcCluskey })}
                  className={clsx(
                    "px-4 py-2 rounded-lg font-bold transition-all duration-300",
                    showQuineMcCluskey
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300"
                  )}
                >
                  {showQuineMcCluskey ? "Hide" : "Show"} Quine-McCluskey
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-700 dark:text-white mb-3">Don't-Care Conditions (X)</h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    In real circuits, some input combinations never occur. Mark these as 'X' in K-map.
                    You can choose to include them in groups if it helps minimization.
                  </p>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-blue-700 dark:text-blue-400">
                      <strong>Example:</strong> In Debangshu's Naihati elevator controller, 
                      certain floor combinations are impossible. Using don't-cares reduced gates by 30%.
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-700 dark:text-white mb-3">Multiple Output Functions</h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    When designing circuits with multiple outputs, optimize all outputs together
                    to share common terms and reduce overall gate count.
                  </p>
                  
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <p className="text-sm text-green-700 dark:text-green-400">
                      <strong>Example:</strong> Tuhina's 7-segment display decoder in Shyamnagar lab 
                      shares terms across segments, reducing from 28 to 18 gates.
                    </p>
                  </div>
                </div>
              </div>
              
              {showQuineMcCluskey && this.renderQuineMcCluskey()}
            </div>
          </section>

          {/* Common Pitfalls */}
          <section className={`mb-16 ${animationClass}`} style={{ animationDelay: "0.6s" }}>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-8 pb-2 border-b border-gray-200 dark:border-gray-700">
              Common Pitfalls & Debugging Tips
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-6 border-2 border-red-200 dark:border-red-800">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mr-3">
                    <span className="text-red-600 dark:text-red-400 text-xl">⚠️</span>
                  </div>
                  <h3 className="text-lg font-bold text-red-800 dark:text-red-300">Common Mistakes</h3>
                </div>
                
                <ul className="space-y-3">
                  {[
                    "Forgetting K-maps wrap around edges (toroidal topology)",
                    "Making groups smaller than possible (not maximizing size)",
                    "Missing overlapping groups (essential prime implicants)",
                    "Incorrect Gray code ordering (00, 01, 11, 10)",
                    "Not considering all possible group formations",
                    "Ignoring don't-care conditions that could help"
                  ].map((mistake, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <span className="text-red-700 dark:text-red-400 text-sm">{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-800">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 dark:text-blue-400 text-xl">🔍</span>
                  </div>
                  <h3 className="text-lg font-bold text-blue-800 dark:text-blue-300">Verification Checklist</h3>
                </div>
                
                <ol className="space-y-2 list-decimal pl-5">
                  {[
                    "Verify all 1s are covered by at least one group",
                    "Check group sizes are powers of 2",
                    "Confirm no group can be expanded further",
                    "Compare original and simplified truth tables",
                    "Try alternative groupings for optimal solution",
                    "Use Boolean algebra to verify equivalence"
                  ].map((step, idx) => (
                    <li key={idx} className="text-blue-700 dark:text-blue-400 text-sm">
                      {step}
                    </li>
                  ))}
                </ol>
                
                <div className="mt-4 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    <strong>Pro Tip:</strong> When Abhronila designs circuits, she always tries 
                    at least 3 different groupings before selecting the minimal one.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className={`mb-16 ${animationClass}`} style={{ animationDelay: "0.7s" }}>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-8 pb-2 border-b border-gray-200 dark:border-gray-700">
              Professional Best Practices
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Industry Standards",
                  practices: [
                    "Use K-maps for up to 4-5 variables",
                    "For more variables, use Quine-McCluskey",
                    "Always document grouping decisions",
                    "Include don't-care conditions when known"
                  ],
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  title: "Optimization Tips",
                  practices: [
                    "Look for overlapping groups first",
                    "Prioritize larger groups (8, 4, 2, 1)",
                    "Consider multiple minimal solutions",
                    "Verify with simulation tools"
                  ],
                  color: "from-green-500 to-emerald-500"
                },
                {
                  title: "Teaching Methods",
                  practices: [
                    "Start with 2-variable examples",
                    "Use color coding for groups",
                    "Practice with real-world problems",
                    "Compare manual vs software solutions"
                  ],
                  color: "from-purple-500 to-pink-500"
                }
              ].map((section, idx) => (
                <div 
                  key={idx}
                  className={clsx(
                    "p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-xl",
                    idx === 0 && "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800",
                    idx === 1 && "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800",
                    idx === 2 && "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800"
                  )}
                >
                  <h3 className="text-lg font-bold mb-4">
                    <span className={clsx(
                      "px-3 py-1 rounded-lg mr-2 text-white",
                      idx === 0 && "bg-gradient-to-r from-blue-500 to-cyan-500",
                      idx === 1 && "bg-gradient-to-r from-green-500 to-emerald-500",
                      idx === 2 && "bg-gradient-to-r from-purple-500 to-pink-500"
                    )}>
                      {idx + 1}
                    </span>
                    {section.title}
                  </h3>
                  
                  <ul className="space-y-2">
                    {section.practices.map((practice, pIdx) => (
                      <li key={pIdx} className="flex items-start">
                        <span className={clsx(
                          "mt-1 mr-2",
                          idx === 0 && "text-blue-500",
                          idx === 1 && "text-green-500",
                          idx === 2 && "text-purple-500"
                        )}>
                          ✓
                        </span>
                        <span className={clsx(
                          "text-sm",
                          idx === 0 && "text-blue-700 dark:text-blue-400",
                          idx === 1 && "text-green-700 dark:text-green-400",
                          idx === 2 && "text-purple-700 dark:text-purple-400"
                        )}>
                          {practice}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Hint Section */}
          <section className={`mb-16 ${animationClass}`} style={{ animationDelay: "0.8s" }}>
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-xl p-8 border-2 border-amber-200 dark:border-amber-800 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white text-xl">💭</span>
                </div>
                <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300">
                  Design Challenge: Barrackpore Metro Card System
                </h3>
              </div>
              
              <p className="text-amber-700 dark:text-amber-400 mb-4 text-lg leading-relaxed">
                Swadeep needs to design a logic circuit for metro card validation with 4 conditions:
              </p>
              
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4 mb-4">
                <ul className="space-y-2 text-amber-800 dark:text-amber-300">
                  <li>A: Card has sufficient balance</li>
                  <li>B: Card is not expired</li>
                  <li>C: Card is not reported stolen</li>
                  <li>D: Peak hours surcharge applies</li>
                </ul>
                <p className="mt-2 text-amber-700 dark:text-amber-400">
                  Gate opens if: (A AND B AND NOT C) OR (A AND B AND D AND NOT C)
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="text-sm text-amber-600 dark:text-amber-500">
                  <span className="font-bold">Your Task:</span>
                  <ul className="mt-2 space-y-1 pl-5">
                    <li>• Create a 4-variable K-map for this function</li>
                    <li>• Identify optimal grouping pattern</li>
                    <li>• Derive minimized Boolean expression</li>
                    <li>• How many gates can you save compared to original?</li>
                  </ul>
                </div>
                
                <div className="text-xs text-amber-500 dark:text-amber-600 italic">
                  Hint: Look for overlapping groups. Don't forget wrap-around edges!
                </div>
              </div>
            </div>
          </section>

          {/* Teacher's Note */}
          <section className={`${animationClass}`} style={{ animationDelay: "0.9s" }}>
            <div className={clsx(
              "bg-gradient-to-r from-purple-50 via-pink-50 to-purple-100 dark:from-purple-900/30 dark:via-pink-900/30 dark:to-purple-900/20",
              "rounded-2xl p-8 border-2 border-purple-300 dark:border-purple-700",
              "transition-all duration-500 hover:shadow-2xl hover:scale-[1.01] hover:border-purple-400 dark:hover:border-purple-600"
            )}>
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-2xl font-bold">SH</span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <h3 className="text-2xl font-bold text-purple-800 dark:text-purple-300">Teacher's Note</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium">
                        Sukanta Hui
                      </span>
                      <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-300 rounded-full text-sm font-medium">
                        27 Years Experience
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-purple-700 dark:text-purple-400 text-lg leading-relaxed">
                      <strong>Critical Insight:</strong> K-maps teach pattern recognition, not just Boolean algebra. 
                      When Tuhina from Shyamnagar struggled, I made her practice grouping patterns separately 
                      <span className="font-bold text-purple-800 dark:text-purple-300"> BEFORE</span> solving full problems.
                      This builds intuition for optimal groupings.
                    </p>
                    
                    <div className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/30 dark:to-purple-900/30 rounded-xl border border-pink-200 dark:border-pink-800">
                      <p className="text-pink-800 dark:text-pink-300 font-medium mb-2">🎯 Classroom Strategy:</p>
                      <p className="text-pink-700 dark:text-pink-400">
                        Use color-coded transparencies or digital overlays to visualize different 
                        grouping possibilities. Students in Ichapur found this especially helpful 
                        for understanding overlapping groups.
                      </p>
                    </div>
                    
                    <div className="pt-4 border-t border-purple-200 dark:border-purple-800">
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center">
                          <span className="text-purple-600 dark:text-purple-400 mr-2">💡</span>
                          <span className="text-purple-700 dark:text-purple-400">Master the 00-01-11-10 sequence</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-purple-600 dark:text-purple-400 mr-2">📚</span>
                          <span className="text-purple-700 dark:text-purple-400">Practice edge wrap-around cases</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-purple-600 dark:text-purple-400 mr-2">⚡</span>
                          <span className="text-purple-700 dark:text-purple-400">Always look for larger groups first</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Reference */}
          <div className={`mt-12 p-8 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl border-2 border-gray-300 dark:border-gray-700 shadow-lg ${animationClass}`} style={{ animationDelay: "1s" }}>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white text-xl">📋</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">K-map Mastery Checklist</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-gray-700 dark:text-white mb-3">Essential Skills</h4>
                <ul className="space-y-2">
                  {[
                    "✓ Plot truth table onto K-map correctly",
                    "✓ Apply Gray code ordering (00-01-11-10)",
                    "✓ Identify adjacent cells (including edges)",
                    "✓ Form largest possible groups",
                    "✓ Write minimized product terms"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center text-gray-700 dark:text-gray-300">
                      <span className="mr-2 text-green-500">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-700 dark:text-white mb-3">Advanced Competencies</h4>
                <ul className="space-y-2">
                  {[
                    "✓ Handle don't-care conditions effectively",
                    "✓ Work with 4+ variable maps",
                    "✓ Verify minimality of solution",
                    "✓ Convert to NAND/NOR implementations",
                    "✓ Apply to real-world optimization"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center text-gray-700 dark:text-gray-300">
                      <span className="mr-2 text-green-500">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-center text-gray-600 dark:text-gray-400 text-sm italic">
                Complete this checklist before moving to Adders and Subtractors. 
                Practice with examples from Barrackpore, Shyamnagar, and Ichapur.
              </p>
            </div>
          </div>
        </main>

        <footer className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            Topic 3: Karnaugh Maps • Next: Adders & Subtractors
          </p>
        </footer>
      </div>
    );
  }
}

export default Topic2;