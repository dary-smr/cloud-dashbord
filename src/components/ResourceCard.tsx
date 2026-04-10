import styles from "./ResourceCard.module.css";
import type { Resource } from "../types";

  
  type ResourceCardProps = {
    resource: Resource;
  };
  
  export function ResourceCard({ resource }: ResourceCardProps) {
    return (
      <div className = {styles.card}>
        <h3>{resource.name}</h3>
        <p className = {styles[resource.status]}> 
            {resource.status}
        </p>
      </div>
    );
  }