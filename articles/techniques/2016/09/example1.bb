SUMMARY = " Source Code Compile"
DESCRIPTION = "Test "
HOMEPAGE = ""
LICENSE = "Commercial"
LIC_FILES_CHKSUM =
"file://${COREBASE}/meta/COPYING.MIT;md5=3da9cfbcb788c80a0384361b4de20420"
PV = "1.0"
PR = "r0"
DEPENDS += "aaaaa"
CFLAGS += "­isystem${STAGING_INCDIR}/linux­headers/usr/include"
CXXFLAGS += "­isystem${STAGING_INCDIR}/linux­headers/usr/include"
PACKAGES = "${PN}"
FILES_${PN} = "\
    /usr/bin/hello­world"
PACKAGES += " ${PN}­dbg"
FILES_${PN}­dbg = "\
          /usr/bin/.debug/* \
                  /usr/src/debug/* "
PACKAGES += " ${PN}­lib"
FILES_${PN}­lib = "/usr/lib/* \"
do_configure(){
   cp ­lr ${TOPDIR}/../hello­world/files/* ${S}/
}
do_compile (){
   export ARCH="arm"
   make
}
do_install(){
    install ­d ${D}${bindir}
    install ­m 0755 ${S}/hello­world ${D}${bindir}
    install ­d ${D}${libdir}
    install ­m 0755 ${S}/lib/* ${D}${libdir}
}
