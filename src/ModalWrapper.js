import React, { Component, Fragment } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grow from '@material-ui/core/Grow';

const styles = {
    title: {
        textAlign: 'center',
        paddingTop: '1.5rem',
        maxWidth: '24rem',
        margin: '0'
    },
    content: {
        textAlign: 'center',
        width: '100%',
        maxWidth: '24rem'
    },
    paperProps: {
        margin:'48px auto', 
        maxWidth:'24rem'
    }
}
const ModalWrapper = (WrappedComponent) => {

    return class extends Component {

        constructor(props) {
            super(props)

            this.state = {
                modalActive: false,
                modalContent: '',
                customProps: {}
            }

            this.openModal = this.openModal.bind(this)
            this.closeModal = this.closeModal.bind(this)
        }

        openModal(content, customProps) {
            this.setState({ 
                modalActive: true,
                modalContent: content,
                customProps: customProps || this.state.customProps
            })
        }

        closeModal() {
            this.setState({ 
                modalActive: false
            })
        }


        render() {
            const { modalActive, modalContent, customProps } = this.state

            return (
                <Fragment>
                    <Dialog
                        PaperProps={{style: customProps.paperProps ? {...styles.paperProps, ...customProps.paperProps} : {...styles.paperProps}}}
                        style={customProps.rootStyle ? {...customProps.rootStyle} : {}} 
                        open={modalActive}
                        onClose={this.closeModal}
                        scroll="body"
                        aria-labelledby="scroll-dialog-title"
                        TransitionComponent={Grow}
                        >
                        {modalContent.title ? <h2 style={styles.title}>{modalContent.title}</h2> : null}
                        <DialogContent style={customProps.contentStyle ? {...styles.content, ...customProps.contentStyle} : styles.content}>
                            {modalActive && modalContent.content}
                        </DialogContent>
                    </Dialog>                    
                    <WrappedComponent isActive={modalActive} openModal={this.openModal} closeModal={this.closeModal} setModalContent={this.setModalContent} {...this.props} />
                </Fragment>
            )
        }
    }
}

export default ModalWrapper;