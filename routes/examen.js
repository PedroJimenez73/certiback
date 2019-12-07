var express = require('express');
var app = express();

const  exams = [
    {
      _id: '001',
      title: 'VMware Certified Professional 6.5 – Data Center Virtualization Delta Exam',
      code: 'Vmware 2V0-622D',
      duration: '120',
      pic: 'assets/vmware.png',
      production: true,
      questions: [
        {
            question: 'An ESXi host’s VMCA-Signed certificate has expired. How can the certificate be renewed?',
            answers: [
                'In the vSphere Web Client, browse to the host in question. Click the Manage tab and select settings. Select System and click Certificate, then click the Renew button.',
                'In the vSphere Web Client, browse to the host in question. Click the Manage tab and select settings. Select System and click Certificate, then click the Refresh CA Certificates button.',
                'Run the command /sbin/generate-certificates on the affected host.',
                'Disconnect the host from vCenter Server and reconnect it.'
            ],
            multi: false,
            corrects: ['D'],
            section: '',
            feedback: [
                {
                    explanation: 'You can renew your certificates when they are about to expire, or if you want to provision the host with a new certificate for other reasons. If the certificate is already expired, you must disconnect the host and reconnect it.',
                    reference: 'https://docs.vmware.com/en/VMware-vSphere/6.5/com.vmware.vsphere.security.doc/GUID- ECFD1A29-0534-4118-B762-967A113D5CAA.html'
                }
            ]
        },
        {
            question: 'Which is the correct order for upgrading vSphere components?',
            answers: [
                'vCenter Server, ESXi hosts, VMware Tools, Virtual Machine hardware',
                'VMware Tools, Virtual Machine hardware, ESXi hosts, vCenter Server',
                'vCenter Server, Virtual Machine hardware, VMware tools, ESXi hosts',
                'ESXi hosts, vCenter Server, Virtual Machine hardware, VMware Tools'
            ],
            multi: false,
            corrects: ['A'],
            section: '',
            feedback: [
                {
                    explanation: 'Correct order is: 1 Back up your configuration 2 Upgrade vCenter Server 3 Upgrade ESXi hosts 4 Upgrade virtual machines and virtual appliances',
                    reference: 'https://docs.vmware.com/en/VMware-vSphere/6.5/vsphere-esxi-vcenter-server-65-upgrade-guide.pdf'
                }
            ]
        },
        {
            question: 'Which two datastore types are supported by Storage I/O Control v2? (Choose two.)',
            answers: [
                'vSAN',
                'RDM',
                'NFS',
                'Virtual Volumes',
                'VMFS'
            ],
            multi: true,
            corrects: ['C','E'],
            section: '',
            feedback: [
                {
                    explanation: '',
                    reference: 'https://storagehub.vmware.com/#!/vsphere-core-storage/vsphere-6-5-storage/storage-i-o-control-v2/1'
                }
            ]
        },
        {
            question: 'Which iSCSI initiator type can be used with any network interface card?',
            answers: [
                'Software iSCSI initiator',
                'Software FCoE adapter',
                'Hardware Independent iSCSI initiator',
                'Hardware Dependent iSCSI initiator',
            ],
            multi: false,
            corrects: ['A'],
            section: '',
            feedback: [
                {
                    explanation: 'A software iSCSI adapter is a VMware code built into the VMkernel. It allows your host to connect to the iSCSI storage device through standard network adapters. The software iSCSI adapter handles iSCSI processing while communicating with the network adapter. With the software iSCSI adapter, you can use iSCSI technology without purchasing specialized hardware.',
                    reference: 'https://docs.vmware.com/en/VMware-vSphere/5.5/com.vmware.vsphere.storage.doc/GUID- 7A4E3767-CB54-4E88-9BA8-298876119465.html'
                }
            ]
        },
        {
            question: `An administrator is attempting to power on a virtual machine with 32GB of memory. The operation fails with the following error:
                       <br>
                       <span>Could not power on VM : No space left on device</span>
                       <br>
                       Checking the space on the virtual machine’s datastore, there is 30GB free.
                       <br>
                       Which action would allow the VM to power on?
                    `,
            answers: [
                'Set a 2GB memory reservation on the VM.',
                'Mount the virtual disk from the affected VM on to another virtual machine and free up space from within the OS.',
                'Enable vSphere HD admission control on the cluster in which the VM resides.',
                'Set a 2GB memory limit on the VM.',
            ],
            multi: false,
            corrects: ['A'],
            section: '',
            feedback: [
                {
                    explanation: 'The swap file size can be calculated with the formula (.vswp File = Allocated Memory - Memory Reservation). As per default, the reservation is set to 0, so the .vswp file size is equal to the amount of virtual memory.',
                    reference: 'https://kb.vmware.com/selfservice/microsites/search.do? language=en_US&cmd=displayKC&externalId=1007638'
                }
            ]
        },
        {
            question: 'When using “Cluster resource percentage” for host failover capacity in vSphere HA Admission Control, the total resource requirements are calculated from which two values? (Choose two.)',
            answers: [
                'Total vCPUs assigned to each VM.',
                'Average CPU usage on each VM over time.',
                'Memory reservations on each VM. D. Total memory assigned to each VM.',
                'Average active memory on each VM over time.',
                'CPU reservations on each VM.'
            ],
            multi: true,
            corrects: ['C','F'],
            section: '',
            feedback: [
                {
                    explanation: '',
                    reference: 'https://docs.vmware.com/en/VMware-vSphere/6.5/com.vmware.vsphere.avail.doc/GUID-FAFEFEFF-56F7-4CDF-A682-FC3C62A29A95.html'
                }
            ]
        }
      ]
    },
    {
      _id: '002',
      title: 'Cisco Qualified Specialist Security and VPN',
      pic: 'assets/cisco.svg',
      production: false,
    }
  ];



app.get('/', (req, res) =>{

    res.status(200).json({
        exams: exams
    })

});

app.get('/:id', (req, res) =>{
    // if(req.params.id === '001') {
        console.log(exams[0]);
        res.status(200).json({
            exam: exams[0]
        });
    // } else {
    //     res.status(200).json({
    //         exam: exams[1]
    //     }); 
    // }
});

module.exports = app;