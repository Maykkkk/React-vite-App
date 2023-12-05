import React, { useState } from 'react';
import { Typography, IconButton, Checkbox, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

interface TreeNode {
  id: number;
  label: string;
  children?: TreeNode[];
}

interface TreeItemProps {
  node: TreeNode;
  onToggle: () => void;
  onSelect: () => void;
  selected: boolean;
  expanded: boolean;
}

const TreeItem: React.FC<TreeItemProps> = ({ node, onToggle, onSelect, selected, expanded }) => {
  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: `${node.children ? -2 : 0}px` }}>
        {node.children && (
          <IconButton onClick={onToggle} size="small" sx={{ marginRight: 0 }}>
            {expanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          </IconButton>
        )}
        <Checkbox
          icon={<CheckBoxOutlineBlankIcon />}
          checkedIcon={<CheckBoxIcon />}
          checked={selected}
          onChange={onSelect}
          sx={{ marginRight: 0 }}
        />
        <Typography variant="body1">{node.label}</Typography>
      </Box>
      {node.children && expanded && (
        <div style={{ marginLeft: 16 }}>
          {node.children.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              onToggle={onToggle}
              onSelect={onSelect}
              selected={selected}
              expanded={expanded}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Component2: React.FC = () => {
    const [selectedNodes, setSelectedNodes] = useState<number[]>([]);
    const [expandedNodes, setExpandedNodes] = useState<number[]>([]);
  
    const handleToggle = (nodeId: number) => {
      setExpandedNodes((prev) => (prev.includes(nodeId) ? prev.filter((id) => id !== nodeId) : [...prev, nodeId]));
    };
  
    const handleSelect = (nodeId: number) => {
        setSelectedNodes((prev) => {
          const isNodeSelected = prev.includes(nodeId);
      
          if (isNodeSelected) {
            return prev.filter((id) => id !== nodeId);
          } else {
            return [nodeId];
          }
        });
      };
      
      
      
      
  
    const renderTree = (node: TreeNode) => (
      <TreeItem
        key={node.id}
        node={node}
        onToggle={() => handleToggle(node.id)}
        onSelect={() => handleSelect(node.id)}
        selected={selectedNodes.includes(node.id)}
        expanded={expandedNodes.includes(node.id)}
      />
    );
  
    const treeData: TreeNode[] = [
      {
        id: 1,
        label: 'Customer_service',
        children: [
          { id: 2, label: 'Support' },
          { id: 3, label: 'Customer_success' },
        ],
      },
      {
        id: 4,
        label: 'Design',
        children: [
          { id: 5, label: 'Graphic_design' },
          { id: 6, label: 'Product_design' },
          { id: 7, label: 'Web_design' },
        ],
      },
    ];
  
    return <div>{treeData.map(renderTree)}</div>;
  };
  
  export default Component2;
