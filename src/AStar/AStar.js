//Alberto Ortega AStar
CAAT.Module({

    /**
     * <p>
     * Class to calculate a star pathfinding
     * Need a Priority queue and a logic Map
     * To know how its work, view http://www.policyalmanac.org/games/aStarTutorial.htm
     * <p>
     * @name AStar
     * @memberOf CAAT.AStar
     * @constructor
     */

    defines:"CAAT.PathUtil.AStar",
    depends:[
    ],
    extendsWith:function () {
        return {

            /**
             * @lends CAAT.PathUtil.AStar.prototype
             */

            __init:function (logicMap) {
				
				this.logicMap = logicMap;
            },


            /**
             * Logic Map
             */
            logicMap:null,


            /**
             * Calculate the route
             * @param initPosX
			 * @param initPosY
			 * @param finalPosX
			 * @param finalPosY
			 * @return route, array of IAStarNodes {array} 
             */
            calculateRoute:function (initPosX,initPosY,finalPosX,finalPosY) {
				
				var closedList = [];
				
				var openList = new CAAT.PriorityQueue({low: true});
				
				var finalNode = new CAAT.PathUtil.IAStarNode(finalPosX, finalPosY, null);
				
				//Add the starting square (or node) to the open list
				openList.push(new CAAT.PathUtil.IAStarNode(initPosX,initPosY,null),0);
				
				//Look for the loswest F cost square on the opne list.
				var currentNode = openList.top();
				
				//Stop when:
				//Add the target square to the closed list, in which case the path has been found, or
				//Fail to find the target square, and the open list is empty. In this case, there is no path.  
				while (!openList.empty() && !currentNode.isSameState(finalNode)){
					
					//Switch it to the closed list
					openList.pop();
					
					closedList.push(currentNode);
					
					//For each of the 8 squares adjacent to this current square:
					cellList = this.logicMap.getAdjacents(currentNode.getPosX(), currentNode.getPosY());
					
					for (cell in cellList){
						
						//If it is not walkable or if it is on the closed list ignore it.
						if (cellList[cell].isFree()){
						
							
							var newNode = new CAAT.PathUtil.IAStarNode(cellList[cell].getPosX(),cellList[cell].getPosY(),currentNode);
							var index = closedList.indexOf(newNode);
							
							if (index == -1){
								
								
								var auxNode = openList.includes(newNode);
								
								if (auxNode == null){
									
									//If it isn't on the open list
									//add it to the opne list. Make the current square the parent of this square. Record F,G,H costs of the square
									newNode.calculate(finalNode);
									
									openList.push(newNode,newNode.getF());
									
								}else{
									
									//If it is on the open list already, check to see if this path to that square is better, using G cost as the measure. 
									//A lower G cost means that this is a better path. If so, change the parent of the square to the current square, and recalculate the G and F scores of the square. 
									//If you are keeping your open list sorted by F score, you may need to resort the list to account for the change.
									if (auxNode.getG() > newNode.getG()){
										openList.erase(auxNode);
										openList.push(newNode,newNode.getF());
									}
								
								}
							}
						}
					}
					
					//Look for the loswest F cost square on the open list.
					var newNode = openList.top();
				
					if (newNode != null){
						currentNode = newNode;
					}
				}
				
				//Get the comple path by the parent of each node
				var finalList = [];
			
				finalList.push(currentNode);
				
				if (currentNode != null){
					
					while (currentNode.getParent() != null){
						finalList.push(currentNode.getParent());
						currentNode = currentNode.getParent();
					}				
				}
				
				return finalList;
 
            }	
			
        }
    }

});