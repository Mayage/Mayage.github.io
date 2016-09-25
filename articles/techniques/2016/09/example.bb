SUMMARY = " Source Code Compile"
DESCRIPTION = "Test "
HOMEPAGE = ""
LICENSE = "Commercial"
LIC_FILES_CHKSUM =
"file://${COREBASE}/meta/COPYING.MIT;md5=3da9cfbcb788c80a0384361b4de20420"
PR = "r0"
PACKAGES = "${PN}"
PACKAGES += " ${PN}­dbg"
FILES_${PN} = "\
    /usr/lib/* \
    /usr/include/*"
FILES_${PN}­dbg = "/usr/lib/.debug/*"
do_configure(){
   cp ­lr "${TOPDIR}"/../hello­mod/files/* ${S}/
}
do_install(){
    export STRIP=""
    install ­d ${D}${includedir}
    install ­m 0755 ${S}/CL/* ${D}${includedir}
    install ­d ${D}${libdir}
    install ­m 0755 ${S}/lib/* ${D}${libdir}
}

