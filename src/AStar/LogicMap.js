//Alberto Ortega LogicMap
CAAT.Module({

    /**
     * <p>
     * Represents a cell of a logic Map
     * Is made of a set of cells
     *
     * <p>
     * @name LogicMap
     * @memberOf CAAT.LogicMap
     * @constructor
     */

    defines:"CAAT.PathUtil.LogicMap",
    depends:[
		"CAAT.PathUtil.Cell"
    ],
    extendsWith:function () {
        return {

            /**
             * @lends CAAT.PathUtil.LogicMap.prototype
             */
			
			/**
			* Constructor
			* @param sizeCellsX
			* @param sizeCellsY
			* @param sizeUnitsX
			* @param sizeUnitsY
			* @param coordsX
			* @param coordsY
			* @param cellSize
			*/

           	__init:function (sizeCellsX,sizeCellsY,sizeUnitsX,sizeUnitsY,coordsX,coordsY,cellSize) {
				
				
				this.sizeCellsX = sizeCellsX;
				this.sizeCellsY = sizeCellsY;
				this.sizeUnitsX = sizeUnitsX;
				this.sizeUnitsY = sizeUnitsY;
				this.coordsX = coordsX;
				this.coordsY = coordsY;
				this.cellSize = cellSize;
				
				var i;
				var j;
				
				this.map = [];
                for (i = 0; i < this.sizeCellsX; i++) {
                    this.map.push([]);
                }
				
				for (i = 0; i < this.sizeCellsX; i++){
					var auxList = this.map[i];
					for (j = 0; j < this.sizeCellsY; j++){
						auxList[j] = new CAAT.PathUtil.Cell(i,j,i * cellSize + cellSize/2,j*cellSize + cellSize/2,0);
					}
				}
				
                return this;
            },

            /**
             * Map x axis size in cells
             */
            sizeCellsX:-1,

            /**
             * Map y axis size in cells
             */
            sizeCellsY:-1,

            /**
             * Map x axis size in units
             */
            sizeUnitsX:-1.0,

            /**
             * Map y axis size in units
             */
            sizeUnitsY:-1.0,
			
			/**
			* Map x coords 
			**/
			coordsX:0,

			/**
			* Map y coords
			**/
			coordsY:0,
			
			/**
			* Cell tam
			**/
			cellSize:0,
			
			/**
			* Map representation
			*/
			map:null,
			
			/**
             * Get the x position of the map
             * @return coordsX {number}
             */
            getCoordsX:function () {
                return this.coordsX;
            },
			
			/**
             * Get the y position of the map
             * @return coordsY {number}
             */
            getCoordsY:function () {
                return this.coordsY;
            },
			
			/**
             * Get the x axis size, in cells, of the map
             * @return sizeCellsX {number}
             */
			getSizeCellsX:function (){
				return this.sizeCellsX;
			},
			
			/**
             * Get the y axis size, in cells, of the map
             * @return sizeCellsY {number}
             */
			getSizeCellsY:function (){
				return this.sizeCellsY;
			},
			
			/**
             * Get the x axis size, in units, of the map
             * @return sizeUnitsX {number}
             */
			getSizeUnitsX:function (){
				return this.sizeUnitsX;
			},
			
			/**
             * Get the y axis size, in units of the map
             * @return sizeUnitsY {number}
             */
			getSizeUnitsY:function (){
				return this.sizeUnitsY;
			},
			
			/**
             * Get the size of the Cells
             * @return cellSize {number}
             */
			getCellSize:function (){
				return this.cellSize;
			},
			
			/**
			* Set a cell as Free
			* @param cellX
			* @param cellY
			*/
			setFree:function (cellX, cellY){
				var aux = this.map[cellX];
				aux[cellY].setContent(0);
				return this;
			},
			
			/**
			* Get if a cell is free
			* @param cellX
			* @param cellY
			* @return isFree {boolean}
			*/
			isFree:function(cellX, cellY){
				var aux = this.map[cellX];
				return (aux[cellY].isFree());
			},
			
			/**
			* Set the content of a cell
			* @param cellX
			* @param cellY
			* @param content
			*/
			setContent:function(cellX,cellY,content){
				var aux = this.map[cellX];
				aux[cellY].setContent(content);
			},
			
			/**
			* Get cell position using coords
			* @return cell position [0] - X , [1] - Y {[]} 
			*/
			coordsToCell:function(coordsX, coordsY){
				var aux = [];
				aux[0] = Math.floor((coordsX - this.coordsX) / this.cellSize);
				aux[1] = Math.floor((coordsY - this.coordsY) / this.cellSize);
				return aux;
			},
			
			/**
			* Get the center coords of a cell
			* @return cell coords [0] - X , [1] - Y {[]} 
			*/
			cellToCoords:function(cellX, cellY){
				var aux = [];
				aux[0] = cellX * this.cellSize + this.cellSize / 2;
				aux[1] = cellY * this.cellSize + this.cellSize / 2;
				return aux;
			},
			
			existsCell:function(cellX,cellY){
				return (cellX >= 0 && cellX < this.sizeCellsX && cellY >= 0 && cellY < this.sizeCellsY); 
			},
			
			/**
			* Return a cell
			* @param cellX
			* @param cellY
			*/
			getCell:function(cellX, cellY){
				var aux = this.map[cellX];
				return aux[cellY];
			},
			
			/**
			* Return adjacents cells
			* @param cellX
			* @param cellY
			*/
			getAdjacents:function(cellX, cellY){
				var cellList = [];
				
				var left = false;
				var right = false;
				
				//Left
				if (cellX > 0){
					cellList.push(this.getCell(cellX - 1,cellY));
					left = true;
				}
				
				//Right
				if (cellX < this.sizeCellsX - 1){
					cellList.push(this.getCell(cellX + 1,cellY));
					right = true;
				}
				
				//Down
				if (cellY > 0){
					cellList.push(this.getCell(cellX,cellY-1));
					
					if(left){
						cellList.push(this.getCell(cellX-1,cellY-1));
					}
					
					if (right){
						cellList.push(this.getCell(cellX +1,cellY -1));
					}
				}
				
				
				//Up
				if (cellY < this.sizeCellsY - 1){
					cellList.push(this.getCell(cellX,cellY+1));
					
					if(left){
						cellList.push(this.getCell(cellX-1,cellY+1));
					}
					
					if (right){
						cellList.push(this.getCell(cellX +1,cellY +1));
					}
				}
				
				return cellList;
			},
		
			
			
        }
    }

});