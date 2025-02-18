import React, { Component } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Paper,
  Checkbox,
  Tooltip,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const fileData = {
  Spf_nonlegal_scannedfiles: {
    acbh: {
      scanneddocapp:
        "https://test-scannedapp-files.s3.us-east-1.amazonaws.com/non-legal/ACBH/scanneddocapp.zip",
    },
    "chief-of-staff": {
      cos_sample:
        "https://test-scannedapp-files.s3.us-east-1.amazonaws.com/non-legal/Chief-of-Staff/cos-sample.zip",
    },
    "general-secretary ehs": {
      GSE_01:
        "https://test-scannedapp-files.s3.us-east-1.amazonaws.com/non-legal/General-Secretary EHS/GSE-01.zip",
    },
    ltss: {
      ltss_02:
        "https://test-scannedapp-files.s3.us-east-1.amazonaws.com/non-legal/LTSS/ltss_02.zip",
    },
    "pms-archives": {
      PMS_01:
        "https://test-scannedapp-files.s3.us-east-1.amazonaws.com/non-legal/PMS-ARCHIVES/PMS-01.zip",
    },
    policy: {
      policy_01:
        "https://test-scannedapp-files.s3.us-east-1.amazonaws.com/non-legal/Policy/policy-01.zip",
      policy_02:
        "https://test-scannedapp-files.s3.us-east-1.amazonaws.com/non-legal/Policy/policy-02.zip",
    },
    "program-integrity": {
      PI_example_02:
        "https://test-scannedapp-files.s3.us-east-1.amazonaws.com/non-legal/Program-Integrity/PI-example-02.zip",
    },
  },
  Spf_legal_scannedfiles: {
    root: {
      sample_legal_01:
        "https://test-scannedapp-files.s3.us-east-1.amazonaws.com/Legal/sample-legal-01.zip",
    },
    scannedfiles: {
      sample_example_02:
        "https://test-scannedapp-files.s3.us-east-1.amazonaws.com/Legal/scannedfiles/sample-example-02.zip",
    },
  },
};

class ListFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFolder: null,
      parentFolder: null,
      selectedFiles: [],
    };
  }

  componentDidMount() {
    this.fetchS3Files();
  }

fetchS3Files = async () => {
  try {
      const response = await axios.get(
          "https://o4mhq37cu9.execute-api.us-east-1.amazonaws.com/development",  
          {
              roles: ["Spf_nonlegal_scannedfiles", "Spf_legal_scannedfiles"]  // Sending roles in body
          },
          {
              headers: {
                 // "x-api-key": "YOUR_API_KEY",  
                  "Content-Type": "application/json"
              }
          }
      );
      
      console.log("S3 Files:", response.data);
  } catch (error) {
      console.error("Error fetching S3 files:", error);
  }
}; 

  handleFolderClick = (folder, parentFolder = null) => {
    this.setState({ currentFolder: folder, parentFolder });
  };

  handleBackClick = () => {
    if (this.state.parentFolder) {
      this.setState({
        currentFolder: this.state.parentFolder,
        parentFolder: null,
      });
    } else {
      this.setState({ currentFolder: null, parentFolder: null });
    }
  };

  handleCheckboxChange = (file, url) => {
    const { selectedFiles } = this.state;
    const fileEntry = { name: file, url };
    if (selectedFiles.some((f) => f.name === file)) {
      this.setState({
        selectedFiles: selectedFiles.filter((item) => item.name !== file),
      });
    } else {
      this.setState({ selectedFiles: [...selectedFiles, fileEntry] });
    }
  };

  handleDownloadSelected = () => {
    console.log("Downloading files:", this.state.selectedFiles);
  };

  renderFiles = (files, parentKey = null) => {
    return Object.entries(files).map(([key, value]) => {
      if (key === "root") {
        return Object.entries(value).map(([fileKey, fileUrl]) => (
          <TableRow key={fileKey}>
            <TableCell padding="checkbox">
              <Checkbox
                onChange={() => this.handleCheckboxChange(fileKey, fileUrl)}
                checked={this.state.selectedFiles.some(
                  (f) => f.name === fileKey
                )}
              />
            </TableCell>
            <TableCell>{fileKey}</TableCell>
            <TableCell>
              <IconButton color="primary" href={fileUrl} target="_blank">
                <DownloadIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ));
      }

      // If it's a file (string), display it with a checkbox
      if (typeof value === "string") {
        return (
          <TableRow key={key}>
            <TableCell padding="checkbox">
              <Checkbox
                onChange={() => this.handleCheckboxChange(key, value)}
                checked={this.state.selectedFiles.some((f) => f.name === key)}
              />
            </TableCell>
            <TableCell>{key}</TableCell>
            <TableCell>
              <IconButton color="primary" href={value} target="_blank">
                <DownloadIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      }

      // If it's a folder (object), allow navigation to it (no checkbox)
      return (
        <TableRow key={key}>
          <TableCell padding="checkbox" />
          <TableCell>
            <Typography
              variant="body1"
              color="primary"
              sx={{ cursor: "pointer" }}
              onClick={() =>
                this.handleFolderClick(value, parentKey ? files : fileData)
              }
            >
              {key}
            </Typography>
          </TableCell>
          <TableCell />
        </TableRow>
      );
    });
  };

  render() {
    const { currentFolder, selectedFiles } = this.state;
    let displayData = currentFolder || fileData;
    if (currentFolder === fileData.Spf_legal_scannedfiles) {
      displayData = {
        root: fileData.Spf_legal_scannedfiles.root,
        scannedfiles: fileData.Spf_legal_scannedfiles.scannedfiles,
      };
    }

    return (
      <Box p={3}>
        <Typography variant="h5" gutterBottom>
          Shared Files
        </Typography>
        <Typography variant="body2" gutterBottom></Typography>
        <Tooltip
          title={
            selectedFiles.length > 0 ? (
              <div>
                {selectedFiles.map((f, index) => (
                  <div key={index}>{f.name}</div>
                ))}
              </div>
            ) : (
              "No files selected"
            )
          }
          arrow
        >
          <span>
            <Button
              variant="contained"
              color="primary"
              sx={{ mb: 2, mr: 2 }}
              onClick={this.handleDownloadSelected}
              disabled={selectedFiles.length === 0}
            >
              Download Selected ( {selectedFiles.length} )
            </Button>
          </span>
        </Tooltip>
        {currentFolder && (
          <Button
            variant="text"
            startIcon={<ArrowBackIcon />}
            onClick={this.handleBackClick}
            sx={{ mb: 2 }}
          >
            Back
          </Button>
        )}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" />
                <TableCell>Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.renderFiles(displayData, currentFolder)}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
}

export default ListFiles;

