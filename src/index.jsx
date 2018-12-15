import React, { Component } from 'react'
import MaterialIcon from 'material-icons-react'
import Dropzone from 'react-dropzone'
import TextHr from './TextHr/index.jsx'
import './photo-uploader.scss'

/**
 * Accepts onUpload prop which is called when a photo is uploaded
 */
class Index extends Component {
  constructor(props, context) {
    super(props, context)
    this.handleFile = this.handleFile.bind(this)
    this.takePhoto = this.takePhoto.bind(this)
    this.clearPhoto = this.clearPhoto.bind(this)
    this.videoRef = React.createRef()
    this.inputRef = React.createRef()
    this.state = {
      image: null,
      displayState: 'dropzone'
    }
  }

  handleFile(files) {
    if (FileReader && files && files.length) {
      const fr = new FileReader()
      fr.onload = () => {
        const image = fr.result
        this.setState({
          image,
          displayState: 'photo'
        })

        if (typeof this.props.onUpload === 'function') this.props.onUpload(image)
      }
      fr.readAsDataURL(files[0])
    }
  }

  renderDisplay() {
    switch (this.state.displayState) {
      case 'dropzone':
        return (
          <Dropzone
            disableClick={true}
            multiple={false}
            className="dropzone"
            activeClassName="active-dropzone"
            acceptClassName="accept-dropzone"
            rejectClassName="reject-dropzone"
            accept="image/*"
            onDrop={this.handleFile}>
            <div className="drop-icon">
              <div id="cloud-icon">
                <MaterialIcon icon="cloud_upload" size="80"/>
              </div>
              <div id="error-icon">
                <MaterialIcon icon="error_outline" size="80" color="red"/>
              </div>
              <div id="check-icon">
                <MaterialIcon
                  icon="check_circle_outline"
                  size="80"
                  color="green"/>
              </div>
            </div>

            <p>Drop a photo here</p>

            <TextHr>or</TextHr>

            <div className="upload-file-button">
              <button
                className="mdc-button mdc-button--raised"
                onClick={() => this.inputRef.current.click()}>
                Upload a Photo
              </button>

              <input
                id="fileInput"
                type="file"
                style={{visibility: 'hidden', position: 'absolute'}}
                ref={this.inputRef}
                multiple={false}
                accept="image/*"
                onChange={() => this.handleFile(this.inputRef.current.files)}/>
            </div>
          </Dropzone>
        )
      case 'photo':
        return (<img alt={'hello'} src={this.state.image}/>)
      case 'camera':
        const constraints = {
          video: true
        }

        navigator.mediaDevices.getUserMedia(constraints)
          .then((stream) => {
            this.videoRef.current.srcObject = stream
          })

        return (<video ref={this.videoRef} autoPlay/>)
      default:
        throw new Error('Unknown display state ' + this.state.displayState)
    }
  }

  takePhoto() {
    const videoRef = this.videoRef.current
    const canvas = document.createElement('canvas')
    canvas.height = videoRef.videoHeight
    canvas.width = videoRef.videoWidth

    const ctx = canvas.getContext('2d')
    ctx.drawImage(videoRef, 0, 0, canvas.width, canvas.height)

    const image = canvas.toDataURL()
    this.setState({
      displayState: 'photo',
      image
    })

    if (!videoRef.srcObject) {
      return
    }
    videoRef.srcObject.getVideoTracks().forEach(track => track.stop())
    if (typeof this.props.onUpload === 'function') this.props.onUpload(image)
  }

  clearPhoto() {
    this.setState({
      image: null,
      displayState: 'dropzone'
    })
    if (this.videoRef.current && this.videoRef.current.srcObject) {
      this.videoRef.current.srcObject.getVideoTracks().forEach(track => track.stop())
    }
  }

  renderButton() {
    switch (this.state.displayState) {
      case 'dropzone':
        return (
          <button className="mdc-button" onClick={() => this.setState({displayState: 'camera'})}>
            <MaterialIcon
              className="mdc-button__icon"
              icon="photo_camera"
              color="#6200ee"/>
            Open Camera
          </button>
        )
      case 'camera':
        return (
          <div className="camera-buttons">
            <button className="mdc-button cancel-btn" onClick={this.clearPhoto}>
              Cancel
            </button>
            <button className="mdc-button" onClick={this.takePhoto}>
              <MaterialIcon
                className="mdc-button__icon"
                icon="fiber_manual_record"
                color="#6200ee"/>
              Take photo
            </button>
          </div>
        )
      case 'photo':
        return (
          <button className="mdc-button" onClick={this.clearPhoto}>
            Clear Photo
          </button>
        )
      default:
        throw new Error('Unknown display state ' + this.state.displayState)
    }

  }

  render() {
    return (
      <div className="photo-uploader-container">
        <div className="photo-uploader">
          <div className="upload-file-wrapper">
            {this.renderDisplay()}
          </div>

          <div className="footer">
            {this.renderButton()}
          </div>
        </div>
      </div>
    )
  }
}

export default Index
