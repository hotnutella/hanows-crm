import React from 'react'
import { InputBase, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import styles from './SearchBar.module.css'

interface SearchBarProps {
    onSearch: (searchTerm: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    return (
        <Paper component="form" className={styles.search} style={{ borderRadius: '20px' }}>
            <InputBase 
                placeholder="Search"
                fullWidth
                onChange={(e) => onSearch(e.target.value)}
                startAdornment={<SearchIcon/>} />
        </Paper>
    )
}

export default SearchBar