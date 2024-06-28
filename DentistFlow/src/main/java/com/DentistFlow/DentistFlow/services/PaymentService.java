package com.DentistFlow.DentistFlow.services;

import com.DentistFlow.DentistFlow.Enum.PaymentStatus;
import com.DentistFlow.DentistFlow.Enum.PaymentType;
import com.DentistFlow.DentistFlow.dtos.NewPaymentDTO;
import com.DentistFlow.DentistFlow.entities.Payment;
import com.DentistFlow.DentistFlow.entities.RendezVous;
import com.DentistFlow.DentistFlow.repository.PaymentRepository;
import com.DentistFlow.DentistFlow.repository.RendezVousRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.UUID;

@Service
@Transactional
public class PaymentService {
    private RendezVousRepository rendezVousRepository;
    private PaymentRepository paymentRepository;

    public PaymentService(RendezVousRepository rendezVousRepository, PaymentRepository paymentRepository) {
        this.rendezVousRepository = rendezVousRepository;
        this.paymentRepository = paymentRepository;
    }
    public Payment savePayment(MultipartFile file, NewPaymentDTO newPaymentDTO) throws IOException {
        //creation du dossier
        Path folderPath= Paths.get(System.getProperty("user.home"),"emsiData", "payments");
        if (!Files.exists(folderPath)){
            Files.createDirectories(folderPath);
        }
        //creation du fichier
        String fileName = UUID.randomUUID().toString();
        Path filePath= Paths.get(System.getProperty("user.home"),"emsiData", "payments", fileName+".pdf");
        Files.copy(file.getInputStream(), filePath);
        RendezVous rendezVous = rendezVousRepository.findById(newPaymentDTO.getRendezvousId()).get();
        Payment payment=Payment.builder()
                .date(newPaymentDTO.getDate()).type(newPaymentDTO.getType()).rendezVous(rendezVous)
                .amount(newPaymentDTO.getAmount())
                .file(filePath.toUri().toString())
                .status(PaymentStatus.CREATED)
                .build();
        return paymentRepository.save(payment);
    }
    public Payment updatePaymentStatus( PaymentStatus status, Long id){
        Payment payment=paymentRepository.findById(id).get();
        payment.setStatus(status);
        return paymentRepository.save(payment);
    }
    public Payment updatePaymentType( PaymentType type, Long id){
        Payment payment=paymentRepository.findById(id).get();
        payment.setType(type);
        return paymentRepository.save(payment);
    }
    public Payment updatePayment(LocalDate date, double amount, PaymentType type, Long rendezvousId, Long id){
        RendezVous rendezVous=rendezVousRepository.findById(rendezvousId).get();
        Payment payment=paymentRepository.findById(id).get();
        payment.setDate(date);
        payment.setAmount(amount);
        payment.setType(type);
        payment.setRendezVous(rendezVous);

        return paymentRepository.save(payment);
    }
    public byte[] getPaymentFile( Long paymentId) throws IOException {

        Payment payment= paymentRepository.findById(paymentId).get();
        return Files.readAllBytes(Path.of(payment.getFile()));

    }
}
