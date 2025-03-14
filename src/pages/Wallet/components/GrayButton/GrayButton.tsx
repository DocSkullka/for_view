import React from "react";
import styles from "./styles.module.scss";

type Props = {
    Icon?: React.FunctionComponent;
    label: string;
    onClick?: (event: React.MouseEvent) => void;
}

export function GrayButton({ Icon, label, onClick }: Props) {

    return (
        <div className={styles.button} onClick={onClick}>
            {Icon ? <Icon/> : null}
            <div className={styles.label}>{label}</div>
        </div>
    );
}
