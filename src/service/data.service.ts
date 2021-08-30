import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class DataService {

  private graphNodes = new BehaviorSubject([
    { id: 1, label: "A" },
    { id: 2, label: "B" },
    { id: 3, label: "C" },
  ]);
  private graphEdges = new BehaviorSubject([
    { from: 1, to: 3 },
    { from: 1, to: 2 },
  ]);
  private idLabelMap = new BehaviorSubject(new Map([
    [1, "A"],
    [2, "B"],
    [3, "C"],
  ]));

  nodes = this.graphNodes.asObservable();
  edges = this.graphEdges.asObservable();
  nodeIdLabelMap = this.idLabelMap.asObservable();

  constructor() {}

  addNode(newNode: { id: number; label: string }) {
    const updatedNodes = this.graphNodes.value;
    updatedNodes.push(newNode);
    this.idLabelMap.value.set(newNode.id, newNode.label);
    this.graphNodes.next(updatedNodes);
  }

  addEdge(newEdge: {from: number; to: number}){
    const updatedEdges = this.graphEdges.value;
    updatedEdges.push(newEdge);
    this.graphEdges.next(updatedEdges);
  }

  editNodeLabel(id, newLabel){
    this.idLabelMap.value.set(id, newLabel);
    const updatedNodes = Array.from(this.idLabelMap.value, item => ({id: item[0], label: item[1]}));
    this.graphNodes.next(updatedNodes);
  }
}
